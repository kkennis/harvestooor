import chai, { expect } from "chai";
import hre, { waffle } from "hardhat";

chai.use(waffle.solidity);

import { fixture, TestContext } from "./utils/fixtures";

const { loadFixture } = waffle;

describe("Harvestooor", () => {
  const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await loadFixture(fixture);
  });

  it("harvests on Uniswap V2", async () => {
    const { harvestooor: h, swapper, sandToken } = ctx;

    const ib = await sandToken.balanceOf(swapper.address);
    const swapAmount = hre.ethers.utils.parseEther("10000");

    // Allow 1% slippage
    const minReturn = swapAmount.div(100).mul(99);

    // Do swap
    await h.connect(swapper).harvestUniV2(sandToken.address, WETH_ADDRESS, swapAmount, minReturn);

    const eb = await sandToken.balanceOf(swapper.address);
    expect(eb).to.be.lt(ib);
    expect(eb).to.be.gt(minReturn);
  });

  it("harvests on Uniswap V3", async () => {
    const { harvestooor: h, swapper, uniToken } = ctx;

    const ib = await uniToken.balanceOf(swapper.address);
    const swapAmount = hre.ethers.utils.parseEther("10000");
    const feeTier = 3000;

    // Allow 1% slippage
    const minReturn = swapAmount.div(100).mul(99);

    // Do swap
    await h.connect(swapper).harvestUniV3(uniToken.address, WETH_ADDRESS, swapAmount, minReturn, feeTier);

    const eb = await uniToken.balanceOf(swapper.address);
    expect(eb).to.be.lt(ib);
    expect(eb).to.be.gt(minReturn);
  });

  it("harvests on Sushiswap", async () => {
    const { harvestooor: h, swapper, sushiToken } = ctx;

    const ib = await sushiToken.balanceOf(swapper.address);
    const swapAmount = hre.ethers.utils.parseEther("10000");

    // Allow 1% slippage
    const minReturn = swapAmount.div(100).mul(99);

    // Do swap
    await h.connect(swapper).harvestSushi(sushiToken.address, WETH_ADDRESS, swapAmount, minReturn);

    const eb = await sushiToken.balanceOf(swapper.address);
    expect(eb).to.be.lt(ib);
    expect(eb).to.be.gt(minReturn);
  });

  it("fails Uniswap V2 harvest if minReturn is not satisfied", async () => {
    const { harvestooor: h, swapper, sandToken } = ctx;

    const swapAmount = hre.ethers.utils.parseEther("10000");
    // No slippage
    const minReturn = swapAmount;

    // Do swap
    await expect(
      h.connect(swapper).harvestUniV2(sandToken.address, WETH_ADDRESS, swapAmount, minReturn),
    ).to.be.revertedWith("Too little received");
  });

  it("fails Uniswap V3 harvest if minReturn is not satisfied", async () => {
    const { harvestooor: h, swapper, uniToken } = ctx;

    const swapAmount = hre.ethers.utils.parseEther("10000");
    const minReturn = swapAmount;
    // No slippage
    const feeTier = 3000;

    // Do swap
    await expect(
      h.connect(swapper).harvestUniV3(uniToken.address, WETH_ADDRESS, swapAmount, minReturn, feeTier),
    ).to.be.revertedWith("Too little received");
  });

  it("fails Sushiswap harvest if minReturn is not satisfied", async () => {
    const { harvestooor: h, swapper, sushiToken } = ctx;

    const swapAmount = hre.ethers.utils.parseEther("10000");
    const minReturn = swapAmount;

    // Do swap
    await expect(
      h.connect(swapper).harvestSushi(sushiToken.address, WETH_ADDRESS, swapAmount, minReturn),
    ).to.be.revertedWith("UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT");
  });
});
