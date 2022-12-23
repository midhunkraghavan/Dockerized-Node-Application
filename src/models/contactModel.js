const {
    pool
} = require('../util/databaseConnection')
const messages = require('../configs/messages.json');


exports.createContact = async function (data, callback) {
    const client = await pool.connect();
    await client.query('BEGIN')
    try {
        const insertQuery = `INSERT INTO public.contacts(
            "firstName", "lastName", email, phone, address, city, state, country, "zipCode", "createdOn", "updatedOn")
	         VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,now(), now()) returning id`;
        const response = await client.query(insertQuery, [
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.address,
            data.city,
            data.state,
            data.country,
            data.zipCode
        ]);
        if (typeof response.rows === 'undefined' || response.rows.length === 0) {
            callback(messages.dbError);
        } else {
            await client.query('COMMIT')
            callback(null, true);
        }

    } catch (error) {
        await client.query('ROLLBACK')
        console.error('contactModel.createContact/try-catch', error)
        callback(messages.dbError);
    } finally {
        client.release();
    }

};


exports.updateContact = async function (data, callback) {
    const client = await pool.connect();
    await client.query('BEGIN')
    try {

        const validContactQuery = `select * from contacts where id = $1`;
        const validContactResponse = await client.query(validContactQuery, [data.id]);

        if (typeof validContactResponse.rows === 'undefined' || validContactResponse.rows.length === 0) {
            callback(messages.validationError)
        } else {

            const updateQuery = `UPDATE public.contacts
            SET "firstName"=$1, "lastName"=$2, email=$3, phone=$4, address=$5,
            city=$6, state=$7, country=$8, "zipCode"=$9,"updatedOn"=now()
            WHERE id=$10;`;
            const response = await client.query(updateQuery, [
                data.firstName,
                data.lastName,
                data.email,
                data.phone,
                data.address,
                data.city,
                data.state,
                data.country,
                data.zipCode,
                data.id
            ]);
            await client.query('COMMIT')
            callback(null, true);
        }

    } catch (error) {
        await client.query('ROLLBACK')
        console.error('contactModel.updateContact/try-catch', error)
        callback(messages.dbError);
    } finally {
        client.release();
    }

};

exports.viewContact = async function (data, callback) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN')
        let viewQuery = `SELECT id, "firstName", "lastName", email, phone, address, city, state, 
        country, "zipCode", "createdOn"::Date, "updatedOn"::Date
        FROM public.contacts where id=${data.id}`
        let viewQueryRes = await client.query(viewQuery);

        if (typeof viewQueryRes.rows === 'undefined' || viewQueryRes.rows.length === 0) {
            callback(messages.validationError)
        } else {
            await client.query('COMMIT')
            callback(null, viewQueryRes.rows[0]);
        }
      } catch (error) {
        await client.query('ROLLBACK')
        console.error('contactModel.viewContact/try-catch', error)
        callback(messages.dbError);
      } finally {
        client.release();
      }
  };

  exports.listContact = async function (data, callback) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN')
      let viewQuery = `SELECT id, "firstName", "lastName", email, phone, address, city, state, 
      country, "zipCode", "createdOn"::Date, "updatedOn"::Date
      FROM public.contacts order by id asc`
      let viewQueryRes = await client.query(viewQuery);
      await client.query('COMMIT')
      callback(null, viewQueryRes.rows);
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('contactModel.listContact/try-catch', error)
      callback(messages.dbError);
    } finally {
      client.release();
    }
};


exports.deleteContact = async function (data, callback) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN')

      const validContactQuery = `select * from contacts where id = $1`;
      const validContactResponse = await client.query(validContactQuery, [data.id]);

      if (typeof validContactResponse.rows === 'undefined' || validContactResponse.rows.length === 0) {
          callback(messages.validationError)
      } else {
        
        let deleteQuery = `delete from contacts where id =${data.id}`
        await client.query(deleteQuery);
        await client.query('COMMIT')
        callback(null, true);
      }

    } catch (error) {
      await client.query('ROLLBACK')
      console.error('contactModel.deleteContact/try-catch', error)
      callback(messages.dbError);
    } finally {
      client.release();
    }
};