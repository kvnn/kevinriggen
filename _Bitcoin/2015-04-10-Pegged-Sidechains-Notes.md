---
layout: post
title: Notes on Pegged Sidechains
---

These are my rough notes on the [Pegged Sidechains Whitepaper]({{ site.url }}/files/Chain_Of_A_Lifetime_December2014.pdf) by Adam Back, Matt Corallo, Luke Dashjr, Mark Friedenbach, Gregory Maxwell, Andrew Miller, Andrew Poelstra,
Jorge Timón, and Pieter Wuille. They are contextual to my knowledge and beliefs at the time.

##Purpose
The purpose of sidechains is to allow the transfer of bitcoins from the Bitcoin blockchain to a different blockchain (that meets the technical criteria for a sidechain).

*Use-case Example:* **Someone could create a sidechain for registering vehicles in the USA that has hooks into the [DMV](http://en.wikipedia.org/wiki/Hell). To buy someone's car, you could create a transfer from your Bitcoin wallet to the sidechain. Now your money lives on the sidechain, and when the [DMV](http://en.wikipedia.org/wiki/Hell) approves the transfer the money goes to the seller and the car title (stored on the blockchain) goes to you.**

> Bitcoin's objective is a blockchain supporting the transfer of a single native digital asset, which isn't redeemable for anything else

- Real-world demands that are challenging Bitcoin's simplicity:
    1. Trade-offs b/w scalability & decentralization
        - e.g. larger block sizes would allow a higher transaction rate (which supports scalability), but it would reduce the # of possible servers able to run a node (because it would be more expensive)
    2. Other trade-offs for blockchain features e.g. support for more succinct & useful contracts or less power for auditability
    3. Other assets, like IOU's, contracts & smart property could be traded on blockchains (but the Bitcoin network wasn't designed for them)
    4. It would be prudent to not secure every Bitcoin w/ the same set of algorithms. If one failure occurs, a total loss of value could occur.
    5. Privacy & censorship-resistance technology could be featured in new technology
    6. Upgrading Bitcoin requires all participants to act in concert. This is limiting to small groups' preferences, as they must go along w/ majority consensus
> "If we had the technology to support the movement of assets between blockchains, new systems could be developed which users could adopt by simply reusing the existing Bitcoin currency"

##Desired Properties of a Solution
1. The holder of an asset which has moved to a sidechain can move it back
2. There should be no ability for a counterparty to stop an asset from moving if the holder wishes it to move
3. Transfers are atomic: they happen entirely or not at all
4. Sidechains should be firewalled. Bugs in one should not be able to attack others
5. Blockchain reorgs, even during transfer, should be handled cleanly.
6. Users shouldn't be required to track sidechains that they aren't actively using

##Terminology
*coin or asset:* digital property whose controller can by cryptographically ascertained
*block:* collection of transactions describing changes in asset control
*blockchain:* well-ordered collection of blocks, on which all users must come to consensus
*reogranisation:* occurs locally in clients when a previously accepted chain is overtaken by a competitor chain w/ more proof of work, causing blocks from losing side of fork to be removed from consensus history
*sidechain:* a blockchain that validates data from other blockchains
*two-way peg:* the mechanism by which coins are transferred b/w sidechains & back at a fixed or deterministic exchange rate
*pegged sidechain:* a sidechain that supports two-way pegged assets
*DMMS:* Dynamic Membership Multi-party Signature. Bitcoin's block headers are the first executed example.
*SPV proof:* Simplified payment verification poof: a DMMS that an action occurred on a Bitcoin-like proof-of-work blockchain. Essentially composed of:
    a. a list of block headers demonstrating proof-of-work
    b. cryptographic proof that an output was created in one of the blocks in the list

##Symmetric Two-way Peg
- To transfer parent-chain coins into sidechain coins, the parent chain coins are sent to a special output on the parent chain that can only be unlocked by an SPV proof of possession on the sidechain
    - The same process is used to send the coin back to the parent chain
- There is a "confirmation period" where a coin must be locked on the parent for a duration (1-2 days) before it can be transferred to the sidechain
- There is a "contest period" where a newly-transferred coin cannot be spent on the sidechain (1-2 days), to prevent a double-spending attack (which can happen if the parent goes through a reorg. that removes the block in which the lock output to the sidechain was created)
- While locked on the parent chain, the coin can be freely transferred on the side chain
- coin retains identity as parent-chain coin & can only be transferred back to chain it came from
- different parent-chain coins must be treated as different assets to protect worthless coins from being exchaned for valuable ones
    - for example, if a Bitcoin is transferred to a sidechain, it should not be treated as equal to a Dogecoin that was sent to the same sidechain
- All of this requires that parent chain & side chains capable of doing SPV validation of data on each other
- Bitcoin will require a [soft fork](https://en.bitcoin.it/wiki/Softfork) to be able to support the import of SPV rules for side chains

