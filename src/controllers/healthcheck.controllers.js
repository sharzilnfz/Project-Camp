import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';


// export const healthCheck = async (req, res) => {
//   try {
//     res
//       .status(200)
//       .json(new ApiResponse(200, { message: 'Server is running!' }));
//   } catch (error) {
//     console.error(error);
//   }
// };

export const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: 'Server is running!' }));
});
