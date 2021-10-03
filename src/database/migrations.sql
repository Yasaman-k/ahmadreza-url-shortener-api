CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full TEXT NOT NULL,
    short TEXT UNIQUE NOT NULL,
    views INTEGER DEFAULT (0),
    created_at TEXT DEFAULT (datetime('now','localtime'))
    );

-- Other Tables ...