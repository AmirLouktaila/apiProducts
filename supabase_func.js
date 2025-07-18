const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SB_URL, process.env.SB_KEY, { auth: { persistSession: false } });


function database(tableName) {
    return {
        async createUser(user) {
            const { data, error } = await supabase
                .from(tableName)
                .insert([user]);
            return { data, error }; 
        },
        async updateUser(id, update) {
            const { data, error } = await supabase
                .from(tableName)
                .update(update)
                .eq('id', id);

            if (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
            return data;
        },

        async prodcutID(userId) {
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .eq('id', userId);

            if (error) {
                throw new Error(`Error fetching user: ${error.message}`);
            }
            return data;
        },
        async getAllProducts() {
            const { data, error } = await supabase
                .from(tableName)
                .select('*');

            if (error) {
                throw new Error(`Error fetching products: ${error.message}`);
            }
            return data;
        },
        async Delete(id) {
            const { data, error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);
            
            if (error) throw new Error(`Error deleting product: ${error.message}`);
            return data;
        },
    };
}

module.exports = database;
