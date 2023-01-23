import DAO from './DAO.js';
import Score from "../model/Score.js";

export default class ScoreDAO extends DAO {
    async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS scores (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            score INT NOT NULL
            );
        `;
        if (await this.execute(sql)) {
            return true;
        }
        return false;
    }

    async dropTable() {
        const sql = `DROP TABLE IF EXISTS scores;`;
        if (await this.execute(sql)) {
            return true;
        }
        return false;
    }

    async createScore(score) {
        const sql = `
            REPLACE INTO scores(id, name, score)
            VALUES(${score.id}, "${score.name}", ${score.score});
        `;
        if (await this.execute(sql)) {
            return true;
        }
        return false;
    }

    async readScore(id) {
        const sql = `SELECT * FROM scores WHERE id = ${id};`;
        const [res] = await this.execute(sql);
        const score = Score.parse(res[0]);
        return score;
    }

    async readScores() {
        const sql = `SELECT * FROM scores;`;
        const [res] = await this.execute(sql);
        let scores = [];
        res.forEach(row => {
            scores.push(Score.parse(row));
        });
        return scores;
    }

    async deleteScore(id) {
        const sql = `
            DELETE FROM scores
            WHERE id = ${id}
        `;
        if (await this.execute(sql)) {
            return true;
        }
        return false;
    }
}