---
title: "Problems of Alerting with Message Queues"
description: "Why building an alerting system with message queues isn't as straightforward as it sounds."
pubDate: "May 03 2026"
heroImage: "/alerting-message-queues.jpg"
ogImage: "/alerting-message-queues_og.png"
minRead: 7
---

Building a security alert system on top of a message queue sounds straightforward. Events go in, alerts come out. Clean.
Then you build it.

## Delivery is a lie

The first thing that bites you is ordering. You expect events to arrive in sequence: motion detected, door opened, door closed. What you actually get is door closed, motion detected, door opened, because messages got processed in parallel or landed on different partitions. The queue did its job. Your code made bad assumptions.

If alerting depends on sequence, you have to handle ordering yourself. Group by device ID, attach timestamps or sequence numbers, reconstruct on the consumer side. It's tedious but it works.

Delivery guarantees sound precise until you read the fine print. At-most-once: you might lose alerts. At-least-once: you will get duplicates. Exactly-once: usually marketing. Security systems can't afford lost alerts, so you pick at-least-once and live with what comes with it.

And what comes with it is duplicates. The consumer crashed after processing but before acknowledging. A network retry fired. The broker redelivered. If you don't handle this, the same escalation fires three times and your on-call starts ignoring notifications, which defeats the entire purpose of having the system. Give every event a unique ID and make "already seen this" a normal code path.

Silent data loss is disturbingly easy to trigger too. Misconfigured retention, non-durable subscriptions, a broker restart at the wrong moment. In a security context, the worst failures are the ones nobody notices. Use persistence and durable consumers. Set up monitoring that flags stalled consumers immediately, not whenever someone thinks to check.

## When things go sideways

Cameras glitch. Sensors go haywire. Suddenly you're swallowing thousands of events per second and your consumers fall behind. The queue buffers everything without complaint, which is part of the problem. It hides the fact that your alerts are now seconds or minutes late. "Real-time" becomes a suggestion.

I've dealt with this by rate-limiting at the consumer and prioritizing motion events over, say, heartbeat checks. Horizontal scaling works too, if your consumer supports it. The point is to have a plan before the burst happens, because it will.
Retries can backfire. If your notification service is down, retries pile up and hammer it harder. I've watched one flaky HTTP endpoint take down an entire alert pipeline because the retry logic had no ceiling. Exponential backoff and dead-letter queues are the standard fix. The harder part is deciding when to stop retrying and escalate differently.

Poison messages show up eventually. Malformed or unexpected input your consumer can't process. Left unchecked, one bad message blocks progress or loops forever. Move it aside after a few failed attempts and keep the pipeline running. You can inspect it later.

## Your data isn't what you think

Today's message format won't be tomorrow's. Producers and consumers won't upgrade in lockstep, and you'll get missing fields, wrong assumptions, crashes. Version your schemas and maintain backward compatibility. Assume some services will always be a version or two behind, because they will.

Timestamps lie. Different devices, different clocks, events arriving with plainly wrong times. Issues like a camera's clock being off by 45 minutes and nobody noticing for a week are typical. Track both event time and ingestion time. Keep NTP running and monitored (possibly even locally).

One noisy camera can also wreck your partitioning strategy. It dominates traffic, overloads a single partition, and the rest of the system sits idle. Good partitioning matters more than raw throughput.

## The last mile

Getting a message through the broker isn't the same as getting an alert to a person. The message gets consumed and processed, but the notification send fails silently. From the outside everything looks fine. The alert never arrived.
The outbox pattern helps here. End-to-end tracing helps. But you have to actually build it. Broker-level delivery confirmations don't cover the last hop to the human.

Debugging async systems is painful because they don't fail loudly. Things just stop happening. Without correlation IDs and tracing, you'll spend hours guessing where a message got stuck. I've wasted a full afternoon on that exact problem before adding correlation IDs to our event envelope.

Raw events aren't alerts either. A motion sensor firing 100 times in a second is one situation, not 100 incidents. If you don't aggregate and correlate before sending to humans, you overwhelm whoever is on the receiving end, and they start treating every alert as noise.

---

Message queues don't solve reliability. They move it somewhere else. The work shifts from "did the event fire" to "did the event arrive, was it processed, was it deduplicated, was the notification sent, did anyone see it." More steps, more ways to lose track. But at least each step is a concrete problem you can reason about and monitor.
