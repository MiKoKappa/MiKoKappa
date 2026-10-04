---
title: "Each Edge a Different Story"
description: "Edge Computing is not as standardized as cloud. Why is so?"
pubDate: "Oct 03 2026"
heroImage: "/each-edge-a-different-story.jpg"
ogImage: "/each-edge-a-different-story.jpg"
minRead: 7
---

# Each Edge a Different Story

<br/>

Every day I work on Edge Computing platforms, and one thing has started to bother me when I attend conferences and listen to talks about Edge. <b>**We seem to use the same word for things that are quite different.** </b> A lot of the Edge Computing I see presented at conferences looks like a small data centre. There are standard rack servers, networking equipment, sometimes even whole orchestrators like Kubernetes, and the whole thing is 'Edge' because it is deployed closer to the customer than a traditional cloud region.

**There is nothing wrong with that. It is a valid and important part of Edge Computing.**

The Edge Computing that I know can be a collection of relatively small computers deployed directly at customer sites. These machines may be sitting in a factory, a shop, an office or another operational environment. They are running a general-purpose platform, potentially Kubernetes, and applications are deployed and managed remotely. This model is also reflected in recent work on IoT edge computing, which describes on-premises nodes and IoT gateways running under remote management. _[1]_

The difference sounds small when described this way. In practice, it changes **almost everything**.

## How did we get here?

We have been moving computation closer to users and data sources for a long time. Content Delivery Networks moved content closer to users. Later, concepts such as cloudlets, fog computing and Multi-access Edge Computing appeared, each addressing different parts of the same general problem: not everything should have to travel all the way to a centralized cloud. Latency is one reason. Bandwidth, resilience, data sovereignty and local processing are others. _[2]_

The terminology changed over time, and eventually "Edge Computing" became the umbrella term that covers many of these approaches, which may also create some confusion. _[3]_

Today, an embedded computer inside an industrial machine or an electrical switchboard, an AI accelerator connected to a CCTV camera, a Kubernetes cluster in a telecom facility and a mini-PC installed under customer's office desk can all be called **Edge**. From a distance, they have something in common: **computation happens closer to where the data is generated or consumed**. From an engineering and operational perspective, however, they can be very different systems.

## Embedded Edge is not the same thing as Platform Edge

One useful distinction is between embedded system edge computing and a general-purpose computing platform. An embedded Edge device is usually designed around a particular function. Its hardware, software and application are often closely connected, and the lifecycle of the computing system follows the lifecycle of the device. This is a very different model from putting a small server next to the equipment and treating that server as infrastructure. Once the machine starts running a container platform, supporting several applications and having its own lifecycle, we are dealing with something closer to a small data centre than an embedded device. The hardware becomes a resource on which a platform operates. This distinction is important because the problems move up a notch.

It is no longer enough to make an application work on a particular piece of hardware. The platform has to provide a stable environment for many applications of different purpose and needs and manage the lifecycle of the infrastructure underneath them. That means operating systems, container runtimes, orchestration, upgrades, monitoring, security, identity, resource management and recovery all become part of the problem.

## But where is that platform running?

There is a big difference between running an Edge platform in a controlled facility and running the same platform at the customer's premises. A small Edge data centre may have only a handful of servers, but it is still a data centre. The environment is designed for IT equipment:

- power and cooling are known quantities,
- network connectivity can be engineered and well planed,
- physical access is auditable,
- hardware can be standardized and replaced by people who understand the infrastructure.

At a customer site, many of these assumptions **disappear**. The computer might be behind a network device that somebody else manages. The power source might not be reliable and power can disappear without warning. Physical access may be unrestricted. The temperature and physical environment may not have been designed with IT equipment in mind. **When something goes wrong, the machine is not sitting in the room next door.**

## The scale changes the problem

One machine at a customer site is manageable. The engineering problem becomes very different when the same platform has to operate across hundreds or thousands of locations. At that point, manually administering machines is not an option. The platform has to assume that individual sites will fail, disappear from the network, receive configuration changes that you did not make, and occasionally contain hardware that behaves differently from the rest of the fleet.

This is one of the defining operational differences of Edge Computing. CNCF's Edge Native work, for example, identifies at-scale management, resource awareness, constrained environments and portability as core principles for Edge Native applications. _[4]_

**Provisioning** therefore needs to be automated. Updates need to be performed remotely. Failed upgrades need a recovery mechanism. Purpose-built operating systems are often the right choice there — Talos Linux, Flatcar Container Linux, Kairos, openSUSE MicroOS to name a few. These projects take different approaches, but immutable or image-based operating systems are particularly interesting for this model because they make the machine itself more declarative and repeatable. Flatcar, for example, uses immutable system images and automated provisioning, while Talos explicitly targets immutable infrastructure for Kubernetes through atomic upgrades and recovery. _[5]_

**Monitoring** needs to work even when connectivity is unreliable - here standars such as OpenTelemetry shine through. _[6]_

**Security** becomes particularly important as well. These computers are physically outside the operator's facilities, potentially accessible to people who are not part of the platform team. Credentials, certificates, device identity, secure boot, disk encryption and remote access all become part of the platform design.

None of these problems are completely new. Cloud and data-centre engineers have been solving versions of them for years. The difference is that at the Edge, the physical environment is much harder to abstract away.

## So is this a different kind of Edge?

I think it is worth looking for better terminology. I would distinguish at least between **Embedded Edge** and **Platform Edge**.

Embedded Edge is computing that is part of a device or piece of equipment. The computing functionality is closely tied to that product - its purpose and manufacturing.
Platform Edge is general-purpose computing infrastructure that can host independently managed workloads.

Then there is another distinction based on where that platform is operated. An Edge platform can run in a controlled Edge data centre, or it can run directly at the customer's site. The latter could perhaps be called **Site Edge** or **Field Edge** with similarities to how **Mist Computing** appeared.

I am not sure yet which terminology makes the most sense, but I think the distinction itself is useful. The important question is not only how close the computing is to the data - it is also what kind of computing it is, who operates it, and how much control they have over the environment in which it runs.

## When does an Edge device become infrastructure?

This is the question I find most interesting. A small computer can be called an Edge device. Put Kubernetes on it and it can be called an Edge cluster. Put several operation-level applications on that cluster and suddenly it starts looking like a small piece of platforming infrastructure. The hardware may still look like a device. Operationally, however, it has become something else. The platform now has to maintain itself, provide an environment for applications, survive failures and support a lifecycle that is independent of any individual application.

That is where I see a significant difference between embedded Edge and what I would call Edge platformization. The challenge is not simply putting compute closer to the customer. The challenge is taking something that normally lives in a data centre and making it operate reliably in places where there is no data centre, no cozy environmental blanket.

And that, at least from my perspective, is where **Edge Computing** gets really interesting.

### References

[1] J. Hong, Y.-G. Hong, X. de Foy, M. Kovatsch, E. Schooler and D. Kutscher, Internet of Things (IoT) Edge Challenges and Functions, RFC 9556, IRTF, April 2024<br/>
[2] M. Iorga, L. Feldman, R. Barton, M. Martin, N. Goren and C. Mahmoudi, Fog Computing Conceptual Model, NIST Special Publication 500-325, 2018<br/>
[3] A. Yousefpour et al., All One Needs to Know about Fog Computing and Related Edge Computing Paradigms: A Complete Survey, Journal of Systems Architecture, 2019<br/>
[4] [Cloud Native Computing Foundation, Edge Native Applications Principles Whitepaper, 2023](https://www.cncf.io/wp-content/uploads/2023/03/CNCF_WhitepaperReport_23.pdf)<br/>
[5] [Talos Linux - Philosophy](https://docs.siderolabs.com/talos/v1.14/learn-more/philosophy)<br/>
[6] [What is OpenTelemetry?](https://opentelemetry.io/docs/what-is-opentelemetry/)
