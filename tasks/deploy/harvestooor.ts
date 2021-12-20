import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Harvestooor } from "../../src/types/Harvestooor";

task("deploy:Harvestooor").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const factory = await ethers.getContractFactory("Harvestooor");
  const harvestooor = <Harvestooor>(
    await factory.deploy("0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F")
  );

  await harvestooor.deployed();
  console.log("Harvestooor deployed to: ", harvestooor.address);
});
