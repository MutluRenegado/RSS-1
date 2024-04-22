const ul = document.getElementById("rss-feeds");

const sources = [
    "https://rssgenerator.mooo.com/feeds/?p=aaHR0cHM6Ly9uZXdzLmdvb2dsZS5jb20vaG9tZT9obD1lbi1HQiZnbD1HQiZjZWlkPUdCOmVu/",
    "https://www.nytimes.com/rss",
    "https://www.washingtonpost.com/discussions/2018/10/12/washington-post-rss-feeds/",
    "https://rssgenerator.mooo.com/feeds/?p=aaHR0cHM6Ly93d3cuY2hpbmFkYWlseS5jb20uY24v",
    "https://www.sabah.com.tr/rss-bilgi/"
];

const parser = new FeedParser();

sources.forEach(feedUrl => {
    fetch(feedUrl)
        .then(response => response.text())
        .then(xml => {
            parser.parseString(xml, (err, feed) => {
                if (err) {
                    console.error("Error parsing RSS feed", err);
                    return;
                }
                feed.items.forEach(item => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.textContent = item.title;
                    a.href = item.link;
                    li.appendChild(a);
                    ul.appendChild(li);
                });
            });
        })
        .catch(error => {
            console.error("Error fetching RSS feed", error);
        });
});
