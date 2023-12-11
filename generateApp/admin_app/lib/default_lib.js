
const foreignKeys_GetAll = function (db_connection,db_name,table_name,callback) {

    const sqlKeysRequest = "select fks.table_name as 'table',kcu.column_name as fk_columns,\n" +
        "       fks.referenced_table_name as primary_table,\n" +
        "       fks.constraint_name\n" +
        "from information_schema.referential_constraints fks\n" +
        "         join information_schema.key_column_usage kcu\n" +
        "              on fks.constraint_schema = kcu.table_schema\n" +
        "                  and fks.table_name = kcu.table_name\n" +
        "                  and fks.constraint_name = kcu.constraint_name\n" +
        "where fks.constraint_schema = ? and fks.table_name = ?\n" +
        "group by fks.constraint_schema,\n" +
        "         fks.table_name,\n" +
        "         fks.unique_constraint_schema,\n" +
        "         fks.referenced_table_name,\n" +
        "         fks.constraint_name\n" +
        "order by fks.constraint_schema,\n" +
        "         fks.table_name;\n";


    db_connection.query(sqlKeysRequest,[db_name,table_name],function (err,fieldsList,fields) {
        if (err) console.log('err', err)

        // console.log('table_name : ', table_name)
        // console.log('fieldsList : ', fieldsList)
        // console.log('fields', fields)
        // console.log('err', err)

        let foreignKeys = fieldsList;

        if (callback) callback(err,foreignKeys)

        return [foreignKeys]

    })
}



const foreignDatas_GetAll = function (db_connection,db_name,table_name,callback) {

    const sqlKeysRequest = "select concat(fks.constraint_schema, '.', fks.table_name) as foreign_table,\n" +
        "       concat(fks.unique_constraint_schema, '.', fks.referenced_table_name)\n" +
        "                                                          as primary_table,\n" +
        "       fks.constraint_name,\n" +
        "       group_concat(kcu.column_name\n" +
        "                    order by position_in_unique_constraint separator ', ')\n" +
        "                                                          as fk_columns\n" +
        "from information_schema.referential_constraints fks\n" +
        "         join information_schema.key_column_usage kcu\n" +
        "              on fks.constraint_schema = kcu.table_schema\n" +
        "                  and fks.table_name = kcu.table_name\n" +
        "                  and fks.constraint_name = kcu.constraint_name\n" +
        "where fks.constraint_schema = ? and fks.table_name = ? and kcu.column_name = ?\n" +
        "group by fks.constraint_schema,\n" +
        "         fks.table_name,\n" +
        "         fks.unique_constraint_schema,\n" +
        "         fks.referenced_table_name,\n" +
        "         fks.constraint_name\n" +
        "order by fks.constraint_schema,\n" +
        "         fks.table_name;"

    foreignKeys_GetAll(db_connection,db_name,table_name,function (err,foreignKeysAll){
        if (err) console.log('err', err)

/*    db_connection.query('describe ??' ,[table_name],function (err,fieldsList,fields) {
        if (err) console.log('err', err)*/

        // console.log('table_name : ', table_name)
        // console.log('fieldsList : ', fieldsList)
        // console.log('fields', fields)
        // console.log('err', err)

        let foreignKeys = [];
        let foreignKeysTables = [];
        let foreignDatasObj = {};

        foreignKeysAll.forEach(async (field) => foreignKeys.push(field.fk_columns))

        // console.log('foreignKeys :',foreignKeys)

        if (foreignKeys.length>0){
            foreignKeys.forEach(async (field,index) => {
                db_connection.query(sqlKeysRequest ,[db_name,table_name,field],function (err,fKeyInfos,fields) {
                    if (err) console.log('err', err)
                    // console.log('fKeyInfos : ',field , fKeyInfos)

                    sql = 'select * from ??'

                    db_connection.query(sql ,[fKeyInfos[0].primary_table],function (err,foreignDatas,fields) {
                        if (err) console.log('err', err)
                        foreignDatasObj[field] = foreignDatas
                        foreignKeysTables.push(fKeyInfos[0].primary_table)

                        // console.log(foreignDatasObj)
                        // console.log('primary table : ',fKeyInfos[0].primary_table)

                        if (index == foreignKeys.length-1) {
                            if (callback) callback(err,foreignKeys,foreignKeysTables,foreignDatasObj)

                            return [foreignKeys,foreignKeysTables,foreignDatasObj]
                        }

                        // console.log('foreignDatas : ', fKeyInfos[0].primary_table ,field , foreignDatas)
                    })

                })
            })
        }
        else {
            if (callback) callback(err,foreignKeys,foreignKeysTables,foreignDatasObj)

            return [foreignKeys,foreignKeysTables,foreignDatasObj]
        }
    })
}



exports.foreignKeys_GetAll = foreignKeys_GetAll;
exports.foreignDatas_GetAll = foreignDatas_GetAll;
