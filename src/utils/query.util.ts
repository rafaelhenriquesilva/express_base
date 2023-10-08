export class QueryUtil {
    static LIMIT_DEFAULT = 100;


    static complementQueryWithLimit = (page: string, limit: string, complement_query: string) => {
        try {
            if (page || limit) {
                if (!page) {
                    page = '1';
                }
                if (!limit) {
                    limit = this.LIMIT_DEFAULT.toString();
                }
                let pageNumber = parseInt(page);
                let limitNumber = parseInt(limit);
                let offset = (pageNumber - 1) * limitNumber;
                complement_query += ` LIMIT ${limit} OFFSET ${offset} `;
            } else {
                complement_query += ` LIMIT ${this.LIMIT_DEFAULT} `;
            }

            return complement_query;
        } catch (error) {
            console.info('Error in complementQueryWithLimit helper');
            console.error(error);
        }
    };
}

