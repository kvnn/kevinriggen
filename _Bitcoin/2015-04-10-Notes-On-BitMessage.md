---
layout: post
title: Notes on BitMessage
---

Notes on the [BitMessage Whitepaper](({{ site.url }}/files/bitmessage.pdf)) by Jonathan Warren. These are contextual to my knowledge and beliefs at the time.

##Purpose of BitMessage
The purpose of BitMessage is to allow users to securely send and receive messages, as well as subscribe to public broadcast messages, using a trustless decentralized peer-to-peer protocol.

- the ability to send encrypted messages is necessary but current solutions are too difficult for people to use
- HTTPS is only as strong as the least trustworthy or competent certificate authority. There are over 1000 CA certificates trusted by Windows or Firefox, owned by hundreds of different organizations.
    - there are plenty of instances of [certificates being spoofed](https://www.eff.org/deeplinks/2011/08/iranian-man-middle-attack-against-google) and seemingly secure networks [being compromised](http://en.wikipedia.org/wiki/Operation_Onymous)

>"What is needed is a communications protocol and accompanying software that encrypts messages, masks
the sender and receiver of messages from others, and guarantees that the sender of a message cannot be
spoofed, without relying on trust and without burdening the user with the details of key management. In
this paper, we propose such a protocol."

##How it works
1. Users exchange a hash of their public key. This functions as their address. If the private key of a user is not compromised, then "the sender of a message cannot be spoofed".
2. Users form a peer-to-peer network, each running the BitMessage client. In order to send a message through the network, a proof-of-work must be completed.
3. Messages have a time attached, and if a message is too old, peers will not relay it. If the sender did not receive an acknowledgment he or she can rebroadcast it with an updated time and a new proof-of-work
4. all users would receive all messages. they would be responsible for attempting to decode each message with each of their private keys to see whether the message is bound for them

##Scalability
- Since all nodes receive all messages, scalability is a concern
- after the number of messages being sent through the network reaches a certain threshold, nodes begin to self-segregate into large clusters called "streams"
- everyone would start out using only stream 1
- the stream number is encoded into each address
- streams are arranged in a hierarchy
- nodes should occasionally connect to peers in their parent stream in order to advertise their existence
- in order to send a message, a node must first connect to the stream encoded in the Bitmessage address

##Broadcasts
- users can learn of a broadcaster and subscribe to their messages
- this would allow an individual or organization to anonymously publish content *using an authenticated identity* to everyone who wishes to listen

## Behavior when a receiver is offline
>"An object is a public key request, a public key, a person-to-person message or a broadcast message. Objects are broadcast throughout a Bitmessage stream. We propose that nodes store all objects for two days and then delete them"

- if a node is offline for more than two days, the sending node will notice and rebroadcast the message, with exponential backoff, forever
- in the worst case, if a user is offline for *n* days, he must go back online and stay connected for *n* days

## Passive operating mode & Spam
>"A particularly paranoid person who wishes to receive message may operate in an entirely passive mode by specifying, in flags attached to his public key, that he will not send acknowledgments"

>"The existing proof-of-work requirement may be sufficient to make spamming users eneconomic. If it is not then there are sever courses of action that can be taken...[including the option to] increase the difficult of the proof-of-work"

## Conclusion
> "We have presented a system that not only bridges the gap between the ease of use of email and the
security of PGP/GPG, but also hides “non‐content” data from prying eyes. The hassle of using a nonhuman‐
friendly address should be more than offset by the benefit of gaining privacy without having to
trust fallible (or malicious) central authorities. The broadcast & subscription feature should prove
especially useful to anyone wishing to anonymously publish content regularly. Paired with the
BitTorrent protocol, individuals could distribute content of any size."