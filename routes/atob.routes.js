import { Router } from 'express'; // Import Router from express
import atob from '../controllers/atob.controller.js'; // Ensure to include the .js extension

const router = Router();

router.get('/:id', atob);

// Export the router using ES module syntax
export default router;