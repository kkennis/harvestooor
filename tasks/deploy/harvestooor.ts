import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Harvestooor } from "../../src/types/Harvestooor";

task("deploy:Harvestooor").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  // const greeterFactory: Greeter__factory = <Greeter__factory>await ethers.getContractFactory("Greeter");
  // const greeter: Greeter = <Greeter>await greeterFactory.deploy(taskArguments.greeting);
  // await greeter.deployed();
  // console.log("Greeter deployed to: ", greeter.address);
});
