import { createClient } from 'pexels';

// API_KEY must be passed in as an environment variable.
// Get yours from: https://www.pexels.com/api/new/

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

export const client = createClient(API_KEY);