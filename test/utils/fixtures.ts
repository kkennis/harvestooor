import hre from "hardhat";
import { Artifact } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { Harvestooor, IERC20 } from "../../src/types";
import { deploy } from "./contracts";

export interface TestContext {
  harvestooor: Harvestooor;
  deployer: SignerWithAddress;
  swapper: SignerWithAddress;
  sushiToken: IERC20;
  uniToken: IERC20;
  sandToken: IERC20;
}

/**
 * Sets up a test context, deploying new contracts and returning them for use in a test
 */
export const fixture = async (): Promise<TestContext> => {
  const signers: SignerWithAddress[] = await hre.ethers.getSigners();
  const [deployer, swapper] = signers;
  const amtToGive = hre.ethers.utils.parseEther("10000");

  // Can only run on mainnet. Uses real swap addresses
  const harvestooor = <Harvestooor>await deploy("Harvestooor", deployer, [
    "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", // Uni exchange (v2 and v3)
    "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", // Sushi exchange
  ]);

  // Give SUSHI, UNI, SAND to swapper
  const erc20: Artifact = await hre.artifacts.readArtifact("IERC20");

  // Give SUSHI
  const sushi = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";
  const sushiHolder = "0x5ac0853b42f42f1955c667890de7411caed906d1";

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sushiHolder],
  });

  const sushiSigner = await hre.ethers.provider.getSigner(sushiHolder);
  const sushiToken = <IERC20>new hre.ethers.Contract(sushi, erc20.abi, sushiSigner);
  await sushiToken.transfer(swapper.address, amtToGive);
  await sushiToken.connect(swapper).approve(harvestooor.address, amtToGive);

  // Give UNI
  const uni = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const uniHolder = "0x7d325a9c8f10758188641fe91cfd902499edc782";

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [uniHolder],
  });

  const uniSigner = await hre.ethers.provider.getSigner(uniHolder);
  const uniToken = <IERC20>new hre.ethers.Contract(uni, erc20.abi, uniSigner);
  await uniToken.transfer(swapper.address, amtToGive);
  await uniToken.connect(swapper).approve(harvestooor.address, amtToGive);

  // Give SAND
  const sand = "0x3845badAde8e6dFF049820680d1F14bD3903a5d0";
  const sandHolder = "0x37d493e32ca5ef914389c8cb2e33e81805309d96";

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [sandHolder],
  });

  const sandSigner = await hre.ethers.provider.getSigner(sandHolder);
  const sandToken = <IERC20>new hre.ethers.Contract(sand, erc20.abi, sandSigner);
  await sandToken.transfer(swapper.address, amtToGive);
  await sandToken.connect(swapper).approve(harvestooor.address, amtToGive);

  return {
    harvestooor,
    deployer,
    swapper,
    sushiToken,
    uniToken,
    sandToken,
  };
};
