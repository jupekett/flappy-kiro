const STORAGE_KEY = 'flappy_kiro_high_score';

export class ScoreManager {
    static getHighScore() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? parseInt(stored, 10) : 0;
        } catch (e) {
            // localStorage unavailable (private browsing, etc.)
            return 0;
        }
    }

    static saveHighScore(score) {
        try {
            const current = ScoreManager.getHighScore();
            if (score > current) {
                localStorage.setItem(STORAGE_KEY, score.toString());
                return true;
            }
            return false;
        } catch (e) {
            // localStorage unavailable
            return false;
        }
    }

    static resetHighScore() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            // localStorage unavailable
        }
    }
}
