import { knex } from "../../../database/knex";
import { Address } from "../types/address";
import { User } from "../types/user";

const createUserTransation = async ({
  user,
  address,
}: {
  user: User;
  address: Address;
}) => {
  const trx = await knex.transaction();

  try {
    await trx("address").insert(address);

    await trx("users").insert(user);

    return await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

export { createUserTransation };
