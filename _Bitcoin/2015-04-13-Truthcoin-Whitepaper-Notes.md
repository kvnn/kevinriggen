---
layout: post
title: Truthcoin Whitepaper Notes
---

My notes on the [Truthcoin Whitepaper]({{ site.url }}/files/truthcoin-whitepaper.pdf) by Paul Sztorc. The purpose of Truthcoin is to add **"the decentralized creation and administration of [Prediction Markets](PMs)(http://en.wikipedia.org/wiki/Prediction_market)"**. Learn more at [truthcoin.info/](http://truthcoin.info/).

There is a [thread on r/bitcoin](http://www.reddit.com/r/Bitcoin/comments/21twnb/trustless_p2p_prediction_markets/) that serves as a good introduction to Truthcoin, with some discussion between critics and the author.

<section>
## Overview

### Assumptions
- Truthcoin inherits all of the assumptions of Bitcoin, e.g. "No malicious entity controls a large percentage of hashing power"
- "There are always future Decisions to resolve"
- No malicious entity owns more than 75% of the VoteCoins of a given Branch
- No malicious entity owns more than 50% of the CashCoins
- Search Costs (for a single VOter to learn the realistic answer to a Decision) are lower than Coordination Costs (for multiple Voters to collectively fabricate a false answer)

### Component overview
1. Truthcoin Blockchain
    - meant to be a [sidechain]({{ site.url }}/files/sidechains.pdf) to Bitcoin
    - a blockchain with "CashCoins" (functionally identical to Bitcoin) and "VoteCoins"
    - VoteCoins:
        - allow Owners to vote on "Decisions"
        - allow Owner to collection half of the transaction fees (paid in CashCoin), as well as authorship fees
        - are lost if Owners fail to vote or cast votes differing from the consensus
        - are gained if Owners vote on neglected Decisions or with the consensus on disputed Decisions
        - do not interfere with the digital-scarcity or value-storage properties of CashCoins
2. Automated Market-Maker
    - Figuratively a "trader" who accepts the other side of any and all Prediction Market trades
    - Literally, a protocol for updating market prices based on trading activity
    - Utilizes [LMSR technology](http://www.eecs.harvard.edu/cs286r/courses/fall12/papers/mktscore.pdf) to ensure permanent market liquidity
    - Collects, stores and pays out balances without human-error or mismanagement

3. Incentive Mechanism

    **Authors**
    - any user can create a prediction market ("Author a Market") about anything
    - authors only have an incentive to write Decisions whose outcome can be easily assessed by Voters
    - authors only have an incentive to create Markets if they anticipate sufficiently-high trading volume

    **VoteCoin Owners** ("Voters")
    - have an incentive to maximize the long-run trading volume of future PMs on their Branch, encouraging them to establish and maintain a reputable network
    - have an incentive to participate in the resolution of all Decisions
    - have an incentive to vote "the way they believe other Voters will vote"
    
    **Traders**
    - anyone who owns a CachCoin can trade on any PM without directly interfacing with VoteCoins
    - have an incentive to set the market price to "their personal expectation of the probability of the event taking place"

    **Bitcoin Miners**
    - have an incentive to mine blocks
    - have an incentive to include every trade and transaction into a block to maximize dividend revenue
    - cannot read Markets or Votes until they have been included in blocks, preventing Miner censors
</section>
<section>
## How it works
###Blockchain and Coin Types

- the blockchain is designed to contain information not only about the transfer of two coin-types, but also about the existence and state of Prediction Markets

####CashCoins
- functionally equivalent to Bitcoins
- accounts always retain a constant amount of unspent coins, private keys only sign messages that transfer coins to a different address, new coins are mined asymptotically approaching 21 million, etc.

####VoteCoins
- accounts may either gain or lose unspent coins, based on voting activity
- private keys can either sign messages which transfer coins to a different account, or Votes
- the total quantity of coins exists immediately, and is constantly redistributed based on voting behavior
- expectation of a max. 10k addresses, most of which will vote and not transact
- coin values are analogous to reputation, influence or shares of a corporation
- "ownership of VoteCoins is a liability as well as an asset"
- owners are expected to use their coins to vote on the status of each decision

### Calculation of Decision Outcomes
#### Decisions
- questions that must be resolved by Voters
- types:
    - Binary
        - e.g. "Will Hillary Clinton be elected US President in 2016?"
        - Decisions: 0, 0.5, 1
        - State ".5" denotes that a Decision is irresolvable
    - Scaled
        - e.g. "How many electoral college votes will Hillary Clinton receive in the 2016 US Presidential election (if Hillary does not run, select 'zero')?"
        - Decisions: [Xmin, Xmax]
- statuses:
    1. **Active**: just been created.

    2. **Matured**: the "date by which the information will become available" has passed, and Votes may be cast

    3. **Disputed**: if Voters cannot sufficiently agree on the outcome

    4. **Resolved**: if Voters have sufficiently agreed and the life-cycle is now over

####Markets
- "the lifeblood of the Truthcoin project"
- allow anyone with CachCoin to buy and sell shares representing states of the world
- all markets are available to all users
- partition the world into **'states'** or "mutually exclusive possible descriptions of reality"
- when traders buy and sell shares, these shares are of a single MarketState
- statuses:
    - Trading: allows traders to buy and sell shares; a Market would be in this status from when it was created until its Decisions are voted on
    - Disputed: activated if any of a Market's Decisions attain 'Disputed' status. No one can buy or sell until the Dispute is resolved.
    - Audited: activated if a Market remained in a Disputed state and became audited; shares can be sold (redeemed); buying is disabled
    - Resolved: activated if all of a Market's Decisions were successfully resolved; shares can be sold (redeemed); buying is disabled

####Other terms
- **Branches**
    - Decisions are partitioned into clusters called "Branches"
    - based primarily on topic
    - each branch has its own set of VoteCoins, Decisions and Voting Period
- **Voting Period**
    - the length of time between two consecutive votes on the same Branch
- **Vote**
    - a Voter's selection of what the Voter believes would match the Decision to its real-world Outcome
    - default value is "Missing"
- **Ballot**
    - a set of the current Voting Period's matured Decisions
    - contain the Decisions of many different Markets
- **Vote Matrix**
    - the matrix created by stacking the Ballots (of a particular Voting Period) by row; the columns correspond to Decisions
- **Outcome**
    - the final, calculated result for each Decision, as determined by the consensus algorithm

####Timeline
1. Decision Added
    - Markets require Decisions, so this is the first step
    - a "Decision Author" would select the appropriate Branch, submit the hash of the Decision and a payment, and wait for the hash to be included in the block

2. Market Added
    - a "Market Author" can create a new prediction market by submitting its hash, number of states, and payment, and waiting for the hash to be included in a block

3. Trading
    - With a market built, traders can now buy and sell shares of the states of the Market e.g. "Buy 3.8 of State 2 of Market m16j9..."

4. Events Occur
    - the events relevant to the Decision(s) of the Market occur and become observable (so Votes can be cast)

5. Decisions Mature
    - Voting is done on the Outcome of all the Branch's Decisions which matured this Voting Period
    - Voters encrypt, sign and broadcast a Ballot which contains their Votes and a new public key
    - Voters can change their Ballot at any time - only the last Ballot stands

6. Votes Decrypted
    - The Votes have been included in the blockchain when this phase begins
    - VoteCoins are temporarily frozen
    - Voters reveal the private key used to encrypt their votes in #5, allowing these votes to be decrypted and read into the consensus algo

7. Decisions Resolve
    - Votes are run through the consensus algo to establish the Outcome of each Decision in the Ballot

8. Redemptions
    - the market-maker
        - stops determining/broadcasting market prices
        - uses the resolved-outcome of Decisions to actively fix shares to their final prices
    - Traders "redeem" these shares for CashCoin

9. Audits
    - A Market may have a Decision where Voters could not sufficiently agree on an Outcome
    - Voters may get a "do-over" on the next Voting Period
    - Failing to reach a consensus ultimately leads to an Audit

#### Consensus Puzzle Pieces
- Singular Value Decomposition (SVD) is the mathematical process that underlies the calculation of Outcomes
- SVD is performed upon the Vote Matrix
- There is more conceptual and technical description of the SVD process in this section

#### Reputation Based Coin Redistribution (RBCR)
- After a round of voting, Branch VoteCoins are redistributed among all of the VoteCoin accounts
- For each account, smooth (weighted average) the value of the previous reputation vector with the value represented by the new reputation vector
- Author suggests weighing the new value 20% and the old value 80%
- Weighing the new value too low and bad agents can coast on inertia without punishment, weighing it too high and the network becomes volatile and neurotic

#### Temporal Economics of RBCR
- RBCR ensures that, even in one voting round, each Voter has one incentive to vote realistically: minimal effort
- Information search costs and psychological effort will be lowest for the Realistic Ballot
- Multiple voting rounds adds a second incentive to vote realistically: revenue maximizations
- Fees & dividends:
    - Authors pay, in CashCoin, Listing Fees when creating a new Market
    - Traders pay Trading Fees in CashCoin while making trades on Markets
    - Fees accumulate and are gradually paid out to VTC Owners
- The gradual payout:
    - Rewards past conformity and provides an incentive to get and keep a high reputation
    - Offsets the constantly-present incentive to be dishonest today and manipulate Outcomes
    - Encourages other behaviors which maximize the future expected trading volume (good judgment, entrepreneurship)

#### Voting Strategy
- Votes are encrypted to prevent any voting commitments from being credible
- Truthcoin provides a strong incentive for Voters to lie to each other about what they plan to do
- We rely ont he assumption that the search costs to accurately resolve a Decision are lower than the cost of active coordination
- The Cheapest Ballot will then be the Realistic Ballot
- Availability fo the VoteCoins on the open marketplace ensures that they are allocated efficiently
- Those who most believe in and are most dedicated to the project will be VoteCoin owners and therefore Voters; Those who lose faith would neither neglect nor interfere, as they can just sell their coins
- Any attack with less than 35% of the voting power will fail outright
- An attack with >65% of a Branch's VoteCoins would be able to successfully alter the state of all Decisions on that Branch
    - it is because of this that the project is capable of determining anything about reality at all
    - this is unlikely for several reasons:
        - an 'ownership attack' would collapse the market price of VoteCoin before anyone could liquidate
        - by (costlessly) deceiving the coalition and returning to the truth, "double-agents" can profit quickly (against the attackers) and over the long run from the increase in coin value
        - each trade changes the price, making it practically impossible for a coalition to end up with a coordinated payout
        - when there are no audits and greater than 10 branches, an honest group needs to control only 5% of the votes in order to ensure that every single Decision is resolved accurately

- The efficacy of these protections is actually tradeable and measurable, which adds a few minor layers of protection and enables skeptics and researchers to understand the risks


### Mining Activity
1. Miners are paid in CashCoin to advance the Truthcoin blockchain, incentivizes Miners to keep the value of CashCoins high
2. Merged mining allows use of the existing Bitcoin infrastructure
3. Miners cannot censor the creation of prediction markets
4. Miners cannot censor votes
5. we could introduce anti-vote-censorship measure and force blocks with relatively low cumulative participation to be rejected by nodes

### Authoring Activity
- fully censorship-resistant - any user can create a prediction market about anything, provided he / she is willing to pay for it
- fees arise from authoring the Decisions and adding the Market
- Authors are entrepreneurial
    - they bear the costs of Market-creation, but also profit as a result of the Market's use
    - get half of all trading fees (Voters get the other half)
    - bear the total lifetime economic costs of a Market by paying upfront fees

### Trading Activity
1. The central goal of a prediction market is to have Traders pay for shares which they either:
    a. sell at a future market price
    b. upon maturation of the Market, redeem at a non-market price which is instead a function solely of the prediction's outcome
2. Traders pay fees in the form of a small percentage (e.g. 1%) of their trade cost
3. Anyone can make pseudonymous trades via CashCoin
4. Shares can be "traded" for efficiency or (optionally) even to offload trading-infrastructure to third parties


### Attempts to Guarentee that the Assumptions Hold
- This section gives evidence to support the integrity of the assumptions mentioned in the Overview

</section>
<section>

## Scalability, Extensibility and Customizability view "Branching"
1. In Bitcoin, a fork occurs when the network cannot agree on a single reality. All users who held 10BTC before the fork would have two separate 'versions' of 10 'BTC' on two different forks

2. This is spectacularly undesirable in a system designed to store value...for several critical reasons, the chief of which are the instantaneous and unexpected doubling of the money supply (if the chains remain separated) or a full reversal of transaction history for an arbitrary subset of the currency system (if the chain re-merge)

3. As all VoteCoin-sets ("Branches") use the same CashCoins, and Markets exist independently of Branches, there is no way of doubling the money supply or double-spending by forking only the VoteCoins (i.e. "Branching")

4. It is possible to double the supply of VoteCoins in order to half the future judging activity required on each of the two new "Branches"
    - because Voters are fatigued at the number of Decisions they are asked to vote on
    - for the sake of increased competition
    - to charge different fees

    > "For example to create a Sports Branch or a Finance Branch. By forking off a new Branch, all previous Owners would maintain their old VoteCoins...Eventually, some Owners would sell...and the Sports Branch would eventually be owned by individuals especially interested in sports...[then] 'Sports' later splits itself into 'Sports:Basketball'"

5. One might create a new VoteCoin set from nowhere to create private internal markets for a business or club; Can set up the initial allocation of reputation...to establish an 'eternal dictator' or 'rotating board of directors', etc

> Branches impose a number of costs on the network: each needs its own n x m Vote Matrix per Voting Period and its own SVD operation, and less-popular Branches may be likely to freeze (fail to achieve the required Λ=150 upcoming Decisions) or simply be bought- up and attacked

> It may be desirable to impose serious prerequisites for both Branching and Planting. The option to Branch may require an automatic trigger, for example, that there be >500 upcoming Decisions. Planting may require the permanent destruction of, say 1 CashCoin, or Branches could be required to bid for the option to “rent” one “SVD slot” among a fixed (but growing) number of slots
</section>
<section>
## Implementation Details
- This section speaks of the technical implementations of Truthcoin
</section>