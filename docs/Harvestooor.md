## `Harvestooor`

### `constructor(contract ISwapRouter02 _uniEx, contract IUniswapV2Router02 _sushiEx)` (public)

### `harvestUniV2(contract IERC20 harvestToken, contract IERC20 exchangeToken, uint256 amount, uint256 minReturn)` (external)

Uses Uniswap V2 for liquidity.
Does not do route-finding, so caller must supply the best exchange token.
Does not support fee-on-transfer tokens.
Use WETH address in exchangeToken for ETH swaps.

Tax-loss harvest a token by swapping in and swapping out.

### `harvestUniV3(contract IERC20 harvestToken, contract IERC20 exchangeToken, uint256 amount, uint256 minReturn, uint256 feeTier)` (external)

Uses Uniswap V3 for liquidity.
Does not do route-finding, so caller must supply the best exchange token.
Does not support fee-on-transfer tokens.
Use WETH address in exchangeToken for ETH swaps.

Tax-loss harvest a token by swapping in and swapping out.

### `harvestSushi(contract IERC20 harvestToken, contract IERC20 exchangeToken, uint256 amount, uint256 minReturn)` (external)

Uses Sushiswap for liquidity.
Does not do route-finding, so caller must supply the best exchange token.
Does not support fee-on-transfer tokens.
Use WETH address in exchangeToken for ETH swaps.

Tax-loss harvest a token by swapping in and swapping out.

### `swapV2(address from, address to, uint256 amount, uint256 minReturn, address recipient) → uint256` (internal)

/\*\*

Execute exchange on Uniswap V2.

### `swapV3(address from, address to, uint256 amount, uint256 minReturn, uint256 feeTier, address recipient) → uint256` (internal)

-

Execute exchange on Uniswap V3.

### `swapSushi(address from, address to, uint256 amount, uint256 minReturn, address recipient) → uint256` (internal)

-

Execute exchange on Sushiswap.
