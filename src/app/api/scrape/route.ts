import * as cheerio from "cheerio";
import axios from "axios";

export async function GET() {
  try {
    const url =
      "https://www.yourinvestmentpropertymag.com.au/top-suburbs/vic/3714-acheron";

    // Fetch HTML
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    const $ = cheerio.load(html);

    // Breadcrumbs
    const breadcrumbs = $("#breadcrumbs span[itemprop='itemListElement']")
      .map((_, el) => {
        const link = $(el).find("a").attr("href") || null;
        return {
          name: $(el).find("[itemprop='name']").text().trim(),
          link,
        };
      })
      .get();

    // Heading + Subheading
    const heading = $("h1").first().text().trim();
    const subheading = $(".banner-content p:not(#breadcrumbs)")
      .first()
      .text()
      .trim();

    // Map Data
    const mapLink = $(".yipca-map a.expand-map").attr("href");
    $(".yipca-map").eq(1).find("a.expand-map svg").html();
    const mapImage = $(".yipca-map img.image-map").attr("src");
    const svgMap = $(".yipca-map a.expand-map").html(); // Extract SVG HTML
    // const svgMap = $(".yipca-map").eq(1).html();
    // const svgMap = $(".yipca-map a.expand-map svg")[0].outerHTML;

    // Debugging log to inspect map data
    console.log("Map Link:", mapLink); // Should show the map link if it's present
    console.log("Map Image:", mapImage); // Should show the map image if it's present
    console.log("SVG Map:", svgMap);

    console.log("Full Map HTML:", $(".yipca-map").html()); // Inspect entire map section

    // Sections
    const sections = $(".content-section")
      .map((_, section) => ({
        title: $(section).find("h2,h3").text().trim(),
        text: $(section).find("p").text().trim(),
        image: $(section).find("img").attr("src") || "",
        graph: $(section).find("canvas, svg, img.graph").attr("src") || "",
      }))
      .get();

    // Tabs
    const tabs = $("#pills-tab li a")
      .slice(0, 2)
      .map((_, tab) => {
        const title = $(tab).text().trim();
        const targetId = $(tab).attr("data-bs-target");
        const contentEl = targetId ? $(targetId).html()?.trim() : "";
        return { title, content: contentEl || "" };
      })
      .get();

    // Key Market Data Table
    const keyMarketData = $(".key-market-data table tbody tr")
      .map((_, row) => {
        const cells = $(row).find("td");
        return {
          label: $(cells[0]).text().trim(),
          house: $(cells[1]).text().trim(),
          unit: $(cells[2]).text().trim(),
        };
      })
      .get();

    // Key Demographics Table
    const keyDemographics = $(".key-demographics table tbody tr")
      .map((_, row) => {
        const cells = $(row).find("td");
        return {
          label: $(cells[0]).text().trim(),
          value2011: $(cells[1]).text().trim(),
          value2016: $(cells[2]).text().trim(),
        };
      })
      .get();

    // Extract token
    const yipChartsToken = $("yip-charts").attr("token") || "";

    const result = {
      breadcrumbs,
      heading,
      subheading,
      map: { link: mapLink, image: mapImage, svg: svgMap },
      sections,
      tabs,
      keyMarketData,
      keyDemographics,
      yipChartsToken,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
