## `IV3SwapRouter`

Functions for swapping tokens via Uniswap V3

### `exactInputSingle(struct IV3SwapRouter.ExactInputSingleParams params) → uint256 amountOut` (external)

Swaps `amountIn` of one token for as much as possible of another token

Setting `amountIn` to 0 will cause the contract to look up its own balance,
and swap the entire amount, enabling contracts to send tokens before calling this function.

### `exactInput(struct IV3SwapRouter.ExactInputParams params) → uint256 amountOut` (external)

Swaps `amountIn` of one token for as much as possible of another along the specified path

Setting `amountIn` to 0 will cause the contract to look up its own balance,
and swap the entire amount, enabling contracts to send tokens before calling this function.

### `exactOutputSingle(struct IV3SwapRouter.ExactOutputSingleParams params) → uint256 amountIn` (external)

Swaps as little as possible of one token for `amountOut` of another token
that may remain in the router after the swap.

### `exactOutput(struct IV3SwapRouter.ExactOutputParams params) → uint256 amountIn` (external)

Swaps as little as possible of one token for `amountOut` of another along the specified path (reversed)
that may remain in the router after the swap.

### `ExactInputSingleParams`

address tokenIn

address tokenOut

uint24 fee

address recipient

uint256 amountIn

uint256 amountOutMinimum

uint160 sqrtPriceLimitX96

### `ExactInputParams`

bytes path

address recipient

uint256 amountIn

uint256 amountOutMinimum

### `ExactOutputSingleParams`

address tokenIn

address tokenOut

uint24 fee

address recipient

uint256 amountOut

uint256 amountInMaximum

uint160 sqrtPriceLimitX96

### `ExactOutputParams`

bytes path

address recipient

uint256 amountOut

uint256 amountInMaximum
