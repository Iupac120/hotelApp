export const insertOrderQuery = `
      INSERT INTO orders (email) VALUES ($1)
      RETURNING order_id;
    `;