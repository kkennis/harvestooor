## `IV2SwapRouter`

Functions for swapping tokens via Uniswap V2

### `swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to) → uint256 amountOut` (external)

Swaps `amountIn` of one token for as much as possible of another token

Setting `amountIn` to 0 will cause the contract to look up its own balance,
and swap the entire amount, enabling contracts to send tokens before calling this function.

### `swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] path, address to) → uint256 amountIn` (external)

Swaps as little as possible of one token for an exact amount of another token
