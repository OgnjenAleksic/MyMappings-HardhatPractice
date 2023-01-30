const { assert, expect } = require("chai");
const { Signer } = require("ethers");
const { id } = require("ethers/lib/utils");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { network } = require("hardhat");
const { getUsedIdentifiers } = require("typechain");

//contract address on goerli  0x94750e85044b12df61F8fe2Da3a044A6b1Cf10AD
//signer address 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
//U testu imam usera i getSigners[1] da bih proverio odakle user is getNamedAccounts crpi adresu :)

network.config.chainId != 31337
  ? describe.skip
  : describe("MyMappings Smart Contract", () => {
      let myMappings, deployer, user;

      beforeEach(async () => {
        await deployments.fixture(["MyMappings"]);
        deployer = (await getNamedAccounts()).deployer;
        user = (await getNamedAccounts()).user;

        myMappings = await ethers.getContract("MyMappings", deployer);
      });

      describe("Constructor", () => {
        it("Sets user correctly", async () => {
          const getUser = await myMappings.getUser();
          assert.equal(user, getUser);
        });
      });

      describe("addBook", () => {
        it("Adds Book struct and connects it to the Id", async () => {
          const firstBook = await myMappings.addBook(
            "1",
            "Milos Crnjanski",
            "Seobe"
          );
          const firstBookReceipt = await firstBook.wait(1);
          const idToBook = await myMappings.books(1);
          console.log(idToBook);
        });
      });
      describe("addMyBook", () => {
        it("Adds book and connects caller(address) with Id and Book struct", async () => {
          const myBook = await myMappings.addMyBook(
            "1",
            "Ivo Andric",
            "Prokleta avlija"
          );

          const myAddressToId = await myMappings.myBooks(deployer, 1);

          const signer = (await ethers.getSigners())[1];

          const usersMappings = myMappings.connect(signer);

          const usersBook = await usersMappings.addMyBook(
            "1",
            "Ivo Andric",
            "Prokleta avlija"
          );

          console.log(signer.address);
          const usersAddressToId = await usersMappings.myBooks(
            signer.address,
            1
          );
          assert.equal(signer.address, user);
          assert.notEqual(myAddressToId, usersAddressToId);
        });
      });
    });
