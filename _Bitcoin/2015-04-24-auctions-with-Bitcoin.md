---
layout: post
title: Auctions on the Bitcoin Blockchain
---

## Overview
Something is being auctioned. It is a car or a house or an island in the Bahamas. The owner of the item can be trusted, and will hand ownership over to whoever pays them the most bitcoin. Anyone can send bitcoin to the current owner's address, and if they are outbid they are reimbursed in full (possibly minus transaction fees).

## Definitions
Item: the object being auctioned
Seller: the current owner of the Item
Address: a bitcoin address
Bidder: a person who has sent bitcoin to the Seller, intending to buy the Item

## Process
1. The Seller lists the item publically. A minimum bid, description of the Item and a process for transferring ownership are given. For example: a 1992 white Toyota Corolla in good condition; 4 BTC minimum; pink slip mailed to winner who is responsible for picking up the car in Los Angeles; auction expires in 72 hours; Bitcoin address 12345

2. Bidder One sends 4 BTC to Seller

3. Bidder Two sends 1 BTC to Seller and 4 BTC to Bidder One (Seller +5, Bidder One +0, Bidder Two -5)

4. Bidder One sends 1 BTC to Seller and 5 BTC to Bidder Two (Seller +6, Bidder One -6, Bidder Two +0)

5. Bidder Three sends 1 BTC to seller and 6 BTC to Bidder One (Seller +7, Bidder One +0, Bidder Two +0, Bidder Three -7)

6. Auction ends and Seller sends Bidder Three the pink slip
