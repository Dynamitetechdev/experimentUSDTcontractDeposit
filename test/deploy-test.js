const { assert, expect } = require("chai");
const { ethers, deployments } = require("hardhat");

describe("Donation Contract", () => {
  let accounts, deployer, DonationContract;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    const Donate = await ethers.getContractFactory("Donate");
    DonationContract = await Donate.deploy(accounts[1].address);
    await DonationContract.deployed();
  });

  describe("pay Fee", () => {
    it("should allow multiple users to pay successfully", async () => {
      for (let i = 1; i <= 5; i++) {
        const connectedContract = await DonationContract.connect(accounts[i]);
        await connectedContract.participateInReward({ value: ethers.utils.parseEther("1") });
      }
      const contractBalance = await DonationContract.getBalance();
      expect(contractBalance).to.equal(ethers.utils.parseEther("5"));
    });
  });

  describe("withdraw", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 5; i++) {
        const connectedContract = await DonationContract.connect(accounts[i]);
        await connectedContract.participateInReward({ value: ethers.utils.parseEther("1") });
      }
    });

    it("owner should be able to withdraw", async () => {
      const initialOwnerBalance = await ethers.provider.getBalance(accounts[0].address);
      await DonationContract.connect(accounts[0]).withdrawFunds();
      const finalOwnerBalance = await ethers.provider.getBalance(accounts[0].address);
      expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
      const contractBalance = await DonationContract.getBalance();
      expect(contractBalance).to.equal(0);
    });

    it("deny access to anybody that is not the owner", async () => {
      const randomDonator = accounts[6];
      const connectedContract = await DonationContract.connect(randomDonator);
      await expect(connectedContract.withdrawFunds()).to.be.revertedWith("You are not the owner");
    });
  });
});