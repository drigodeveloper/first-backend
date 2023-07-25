const knex = require("../database/knex");

class NotesConrtoller { 
    async create(request, response) {
        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        const note_id = await knex("notes").insert({
            title,
            description, 
            user_id
        });

        const LinkInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await knex("links").insert(LinkInsert);

        const TagsInsert = tags.map(link => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(TagsInsert)
        response.json();
    }
}

module.exports = NotesConrtoller; 
                