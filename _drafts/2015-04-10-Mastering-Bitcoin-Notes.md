---
layout: post
title: Notes on Mastering Bitcoin
---
These are my notes on [Mastering Bitcoin](https://github.com/aantonop/bitcoinbook) by Andreas M. Antonopoulos. They reflect the context of my knowledge and beliefs at the time taken.

##  Ch. 1: Introduction
- I didn't value this section because I was already familiar with Bitcoin. I believe it may be a good introduction to Bitcoin, but am not certain.

##  CH. 2: How Bitcoin Works
###  Transactions
> "a transaction tells the network that the owner of a number of bitcoins has authorized the transfer of some of those bitcoins to another owner. The new owner can now spend these bitcoins by creating another transaction that authorizes transfer to another owner, and so on, in a chain of ownership."

- Transactions are like lines in a double-entry bookkeping ledger
- each transaction contains one or more "inputs"
- there are one or more "outputs," which are credits added to a bitcoin account

> "The transaction also contains proof of ownership for each amount of bitcoin (input) whose value is transferred, in the form of a digital signature from the owner, which can be independently validated by anyone."

- "spending" is signing a transaction that transfers value from a previous transaction over to a new owner identified by a bitcoin address
- transactions move value from *transaction inputs* to *transaction outputs*
- the most common form of transaction is a simple payment from one address to another, which often includes some "change" returned to the original owner
- another common form is one that aggregates several inputs into a single output

###  Constructing a Transaction
- Wallet applications contain all of the logic for selecting appropriate inputs and outputs to build a transaction
- the transaction does not need to be constructed and signed while connected to the bitcoin network
- it does need to be sent to the network at some point, for the transaction to be executed
