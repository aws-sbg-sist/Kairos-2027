# KAIROS 2027 — Arena Network Topology and Operations Plan

**Technical Owner:** Shanmugapriyan, Chief Technology & Infrastructure Officer
**Status:** Proposed implementation plan — requires SIST Network Operations approval
**Event:** 22–24 January 2027
**Capacity target:** 75 teams, approximately 400 builders and up to 1,000 concurrent devices
**Internet service target:** 1 Gbps aggregate event connectivity

## 1. Design goals

- Provide stable, isolated connectivity to participants, judges, organizers, stage systems and infrastructure management.
- Keep event-management devices separate from participant traffic.
- Prevent participant-to-participant lateral movement through wireless client isolation and network policy.
- Prioritize judging, registration, stage broadcast and operational services during congestion.
- Produce enough monitoring evidence to diagnose failures without inspecting participant application content.
- Maintain a documented fallback when the primary uplink, core device or access point fails.

## 2. Proposed physical topology

```text
Primary ISP / SIST Campus WAN (1 Gbps target)
                    │
          [University Edge / Firewall]
                    │
          [Event HA Firewall Pair]
                    │ 10 Gbps recommended core handoff
          [Redundant L3 Core Switches]
             │          │          │
             │          │          └── Stage / AV access switch
             │          └───────────── Judge and organizer access switch
             └──────────────────────── Hall distribution switches
                                            │
                                  PoE Wi-Fi 6 access points
                                  Wired operations endpoints
```

The 1 Gbps figure is the shared internet-service target. Core and distribution uplinks should use 10 Gbps where available so internal traffic and multiple 1 Gbps access links do not bottleneck at the core.

## 3. Proposed logical segmentation

| VLAN | Purpose | Proposed subnet | Access policy |
|---:|---|---|---|
| 10 | Network management | `10.27.10.0/24` | Network administrators only; no participant access |
| 20 | Organizers and registration | `10.27.20.0/24` | Event applications, printers and approved university services |
| 30 | Judges and evaluation devices | `10.27.30.0/24` | Judging portal and internet; deny participant VLAN initiation |
| 40 | Participant devices | `10.27.40.0/21` | Internet access with wireless client isolation |
| 50 | Stage, streaming and AV | `10.27.50.0/24` | Priority access to approved broadcast and telemetry services |
| 60 | Event IoT and badge devices | `10.27.60.0/24` | Allowlisted services only |
| 70 | Guest access | `10.27.64.0/22` | Rate-limited internet-only access |
| 80 | Quarantine and remediation | `10.27.80.0/24` | Support portal and approved update endpoints only |

These addresses are planning examples. SIST Network Operations must approve or replace them to prevent overlap with campus networks.

## 4. Wireless plan

- Perform a physical RF survey before final access-point placement.
- Start capacity planning with approximately 18–20 Wi-Fi 6 access points across the three hacking halls and common areas; adjust from the survey results.
- Prefer 5 GHz and 6 GHz where supported; keep 2.4 GHz for compatibility and IoT only.
- Use lower transmit power and smaller cells in dense halls instead of a few high-power access points.
- Enable band steering, airtime fairness and wireless client isolation on participant SSIDs.
- Use non-overlapping channels and document the channel plan.
- Avoid exposing switch, controller or access-point management interfaces through event SSIDs.

### Proposed SSIDs

| SSID | VLAN | Intended users | Authentication |
|---|---:|---|---|
| `KAIROS-BUILDERS` | 40 | Finalist teams | Per-event credentials or approved enterprise authentication |
| `KAIROS-JURY` | 30 | Judges | Individual or rotated controlled credentials |
| `KAIROS-OPS` | 20 | Organizers | Individual or approved enterprise authentication |
| `KAIROS-GUEST` | 70 | Visitors | Captive portal and rate limiting |

Passwords must not be stored in this repository or printed in public documentation.

## 5. Traffic policy and quality of service

1. Highest operational priority: judging API, registration/check-in, DNS, DHCP and authentication.
2. High priority: stage telemetry, event announcements and approved broadcast control.
3. Standard priority: participant development traffic, GitHub and AWS endpoints.
4. Rate-limited: operating-system updates, bulk downloads and guest traffic.
5. Blocked or restricted according to university policy: peer-to-peer abuse, cryptocurrency mining, malicious scanning and unauthorized internal-network access.

The network team should allow the AWS and GitHub endpoints required by participant projects without attempting to enumerate every possible cloud hostname in advance.

## 6. Reliability and fallback

- Use redundant core switching and firewall capability where university infrastructure permits.
- Keep configuration backups for firewalls, switches, controllers and DHCP scopes.
- Maintain spare access points, optics, patch cables and PoE switch capacity.
- Pre-stage an emergency SSID with a documented activation process.
- Keep a limited backup uplink for judging, registration and organizer communications if available; do not promise full participant capacity over the backup.
- Record the accountable operator and rollback step for every configuration change during the event.

## 7. Monitoring dashboard

Track at minimum:

- WAN utilization, latency, packet loss and DNS response time
- Active clients by SSID, VLAN and access point
- Channel utilization, retry rate and authentication failures
- DHCP pool utilization and lease failures
- Firewall session count and denied-traffic anomalies
- Judging and registration endpoint health
- GitHub webhook delivery success and processing latency
- Incident count, owner, start time, mitigation and closure time

Monitoring should collect operational metadata, not participant source code or private application payloads.

## 8. Pre-event acceptance tests

- [ ] Confirm approved IP ranges and VLANs with SIST Network Operations.
- [ ] Validate DHCP and DNS from every SSID in every hall.
- [ ] Confirm participant client isolation.
- [ ] Confirm participant devices cannot reach management, judge or organizer VLANs.
- [ ] Confirm judges can reach the judging portal during simulated participant load.
- [ ] Load-test with representative concurrent clients and traffic patterns.
- [ ] Test AP failure and client roaming.
- [ ] Test primary-uplink failure and the limited operational fallback.
- [ ] Confirm GitHub and required AWS endpoints are reachable.
- [ ] Confirm monitoring, alerting and incident logging.
- [ ] Save approved configurations and document rollback procedures.

## 9. Event escalation

```text
Participant issue
  → Floor technical volunteer
  → Hall network lead
  → CTO / Network Operations coordinator
  → SIST Network Operations / Faculty escalation
```

Security incidents, widespread authentication failures, management-plane exposure and sustained loss of judging connectivity must be escalated immediately.

## 10. Approval dependencies

This document does not authorize changes to university networking. Final implementation requires:

- SIST Network Operations approval
- Confirmed venue floor plan and RF survey
- Confirmed switching, access-point and firewall inventory
- Approved ISP/campus uplink capacity
- Named network operators and event shift roster
- University security and acceptable-use policy alignment
