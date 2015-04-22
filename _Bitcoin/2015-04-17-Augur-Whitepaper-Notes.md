---
layout: post
title: Augur Whitepaper Notes
---

My notes on the [Augur Whitepaper]({{ site.url }}/files/augur.pdf) by Dr. Jack Peterson & Joseph Krug.

> A prediction market is a place where individuals can
wager on the outcomes of future events. Those who fore-
cast the outcome correctly win money, and if they fore-
cast incorrectly, they lose money.

> Our goal here is to provide a blueprint of a decentral-
ized prediction market using Bitcoin's input/output-style
transactions. Many theoretical details of this project,
such as its game-theoretic underpinning, are touched on
lightly or not at all. This work builds on (and is intended
to be read as a companion to) the theoretical foundation
established in [[the Truthcoin white paper]({{ site.url }}/files/truthcoin-whitepaper.pdf)].

- Built as an extension of Bitcoin core

- Adds betting and consensus mechanisms

- Intended to be a sidechain of Bitcoin

- Replaces "VoteCoins" from Truthcoin with "Reputation"

- Every transaction input and output field has a "units" field that can be "Bitcoin" (transferred through the pegged sidechain mechanism), "Reputation" or another currency used to hedge against long-term volatility