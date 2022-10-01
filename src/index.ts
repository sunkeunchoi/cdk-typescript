import got from 'got';
import * as cheerio from 'cheerio';
import { Callback, Context, EventBridgeEvent } from "aws-lambda";
interface UrlData {
    id: string,
    href: string,
    title: string,
};
interface DetailData {
    detail: string
}
export const booktokiHandler = async (event: { novel_id: number, detail?: boolean }, _context: Context) => {
    const { detail, novel_id } = event;
    if (!novel_id) {
        console.error(`Error: Invalid event parameter missing novel_id`)
        return Error("Invalid parameter : novel_id")
    }
    const url = detail ? `https://booktoki156.com/novel/${novel_id}?spage=1` : `https://booktoki156.com/novel/${novel_id}`
    console.info(`Start processing: ${url}`);
    // let html;
    // try {
    //     html = await getHtmlDocument(url);
    // } catch (e: any) {
    //     console.error(`Error: failed to get html document`)
    //     return Error(`Failed to get html document ${e.message}`)
    // }
    const html = await getHtmlDocument(url);

    if (is_blocked(html)) {
        console.error(`Error: Site is bloced`)
        return Error("Site is blocked")
    }
    const data = detail ? await parseDetails(html) : await parseUrls(html)
    return data
}
const is_blocked = (html: string): boolean => {
    const re = /귀하는 240시간동안 접근 불가합니다/gi;
    return html.search(re) !== -1
}

const getHtmlDocument = async (url: string): Promise<string> => {
    return got.get(url, {
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.6",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        },
    }).text()
}

const parseDetails = async (html: string): Promise<DetailData> => {
    const $ = cheerio.load(html)
    const textList = $("#novel_content").find("p").map((i, el) => {
        return $(el).text()
    }).get()
    return { detail: textList.join("\n") };
}
const parseUrls = async (html: string): Promise<UrlData[]> => {
    const $ = cheerio.load(html)
    return $("ul.list-body > li.list-item").map((i, el) => {
        $(el).find("span").remove();
        const inner = $(el).find("div.wr-subject > a").first();
        return {
            id: $(el).find("div.wr-num").first().text().trim(),
            href: inner.attr("href") ?? "",
            title: inner.text().trim()
        }
    }).get()
}