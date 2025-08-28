import { knex } from "../../../database/knex";
import { Address } from "../types/address";
import { User } from "../types/user";

const updateUserTransation = async ({
  user,
  address,
}: {
  user: User;
  address: Address;
}) => {
  const trx = await knex.transaction();

  try {
    await trx("address").update(address).where({ id: address.id });

    await trx("users").update(user).where({ id: user.id });

    return await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

export { updateUserTransation };
