# RSA SOLVER

This website aims to solve RSA encryption problems.

## ALGORITHM

1. First we take 2 prime numbers, p and q, and calculate their product n = p * q.
2. Then we calculate the totient of n, which is (p-1) * (q-1).
3. We then take a number e, which is coprime to the totient of n.
4. We then calculate the modular multiplicative inverse of e and the totient of n, which is d. or e * d = 1 mod totient(n)
5. We then take the message, m, and encrypt it using the public key (e, n) to get the ciphertext, c. or c = m^e mod n
6. We then decrypt the ciphertext, c, using the private key (d, n) to get the message, m. or m = c^d mod n

## ALGORITHM

1. First we take 2 prime numbers, p and q, and calculate their product n = p * q.
2. Then we calculate the totient of n, which is (p-1) * (q-1).
3. We then take a number e, which is coprime to the totient of n.
4. We then calculate the modular multiplicative inverse of e and the totient of n, which is d. or e * d = 1 mod totient(n)
5. We then take the message, m, and encrypt it using the public key (e, n) to get the ciphertext, c. or c = m^e mod n
6. We then decrypt the ciphertext, c, using the private key (d, n) to get the message, m. or m = c^d mod n


## How to use

1. Clone the repository
2. Install the dependencies with ``` yarn ```
3. Run the server with ```yarn start / yarn dev```



## Features

- [x] RSA Encryption
- [x] RSA Decryption
- [x] RSA Key Generation

## Screenshots

- ### Key genration
![image](https://github.com/dhruvmillu/Dev-Geeks/assets/75222710/bed099d6-4bf4-499e-b5c1-db5053590599)

- ### Encryption
![image](https://github.com/dhruvmillu/Dev-Geeks/assets/75222710/0d6fe5fd-1e51-45fa-8e0a-38674eeafabb)

- ### Decryption
![image](https://github.com/dhruvmillu/Dev-Geeks/assets/75222710/1b3fec4c-e656-4432-aba3-7dd6258e9164)
