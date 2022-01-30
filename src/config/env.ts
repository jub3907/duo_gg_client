export const NODE_ENV = process.env.NODE_ENV || '';

export const API_URL = process.env.API_URL || '';
export const SITE_URL = process.env.SITE_URL || '';

if (process.env.NODE_ENV === 'development') {
  console.log('\n---------ENV---------\n');
  console.log(`NODE_ENV`, NODE_ENV);
  console.log(`API_URL`, API_URL);
  console.log(`SITE_URL`, SITE_URL);
}
