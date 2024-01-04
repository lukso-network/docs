---
sidebar_label: 'Security'
sidebar_position: 6
description: LUKSO node security considerations.
---

# Node Security

## If I run a node, can my location be tracked?

Yes, your location can be tracked by running a node, as your node machine's public IP address will be exposed to connect to other peers within the blockchain network.

## Is it possible to get access to my funds from the machine?

If someone could log into your node, he can **only access your validator keys if he also knows your validator wallet password**. By gaining access to your wallet password, the attacker could act maliciously by forcing slashable events or restarting the client with a different recipient fee address.

Machine access is risky if you set up automation with a password file or use Lighthouse- as the client stores the wallet password within the config file during the initial startup. Therefore, it's a must-have to **restrict access to your node using key authentication** and **read and write access to files for a specific user**. This way, no one can see or change your configurations without also knowing the admin password of your machine. You can find more information about all the security setups within the [Extended Node Guide](https://docs.luksoverse.io/docs/) written by community members.

## What are the additional safety measures for running a node?

Please set up **key authentication** and turn off password login for node setups. The restriction will ensure no one can gain access even when knowing the user password. For the network side, it is highly recommended to properly set up your **firewall and protect your ports from brute-force attacks** using tools like [Fail2Ban](https://www.fail2ban.org/). Using a **VPN service** is also recommended to gain secure access to your node externally. **Assigning a separate user to every process** running on your node is also a good practice. This way, potential software bugs can not compromise any other directories on your disk. You can find more information about all the security setups within the [Extended Node Guide](https://docs.luksoverse.io/docs/) written by community members.

## Are there safety measures if 3rd parties can physically access my node?

If your node is physically exposed to others, ensure your **user account and validator key passwords are securely locked** from others. If correctly set up, they can only turn the node off without getting access to your keys.

The default LUKSO CLI requires inputting your wallet password to restart your Prysm client after modification. For Lighthouse, the password is stored within the configuration after the first setup. Here, make sure no one can get access to your **login credentials** or additionally encrypt your node so people are not able to gain access to your validator keys.

## How can I create my validator keys securely?

Validator nodes play a crucial role in the blockchain network, participating in the consensus mechanism to validate transactions and create new blocks. As such, the security of these validator nodes and their associated keys is paramount. Generating your validator keys on a **clean, offline device that has never touched the internet during the setup** is an ideal and recommended practice for the following reasons:

- **Mitigation of Cyber Threats**: By generating validator keys on a clean, offline device, you reduce exposure to potential online threats, including malware, hacking, and other forms of cyberattacks. With no internet connection, the chances of a hacker accessing your keys are essentially zero.
- **Control Over Key Generation**: Generating keys offline ensures complete control over the entire process. The private keys are not exposed to third-party services, minimizing the risk of unauthorized access or leakage. A clean operating system installation is an excellent variant to establish this security so that no other program or service can copy clipboards and store them somewhere until the network connection is restored.
- **Elimination of Potential Spyware**: A clean device implies a system free of any potential spyware, adware, or malicious software that could compromise your keys. Eliminating the risk of spyware is crucial, as such threats could potentially record your keystrokes or screen, which could expose your private keys.
- **Protection against Remote Attacks**: An offline device is inherently immune to remote attacks. Hackers cannot penetrate a device that is not connected to a network.
- **Enhanced Privacy**: Offline generation of keys ensures that no traces of your keys are left online, providing maximum privacy.

## How are my validator keys secured?

Your validator keys generated with either the [LUKSO Wagyu Key Gen](https://github.com/lukso-network/tools-wagyu-key-gen) or the [LUKSO Key Gen CLI](https://github.com/lukso-network/tools-key-gen-cli) will be encrypted with a password on creation. In addition, you will receive a mnemonic seed phrase that acts as a backup to recreate all or more validator keys.
