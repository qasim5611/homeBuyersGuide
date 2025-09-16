import puppeteer from "puppeteer";
import { executablePath } from "puppeteer";
export async function GET() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(), // auto detects installed Chromium
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Disable images and CSS files
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const resourceType = request.resourceType();
      if (
        resourceType === "image" ||
        resourceType === "stylesheet" ||
        resourceType === "font"
      ) {
        request.abort(); // Block images, CSS, and fonts
      } else {
        request.continue(); // Allow other requests (HTML, JavaScript)
      }
    });

    await page.goto(
      "https://www.yourinvestmentpropertymag.com.au/top-suburbs/wa/6101-east-victoria-park",
      { waitUntil: "domcontentloaded", timeout: 60000 }
    );

    // ✅ Extract structured data
    const data = await page.evaluate(() => {
      // Breadcrumbs
      const breadcrumbs = Array.from(
        document.querySelectorAll(
          "#breadcrumbs span[itemprop='itemListElement']"
        )
      ).map((el) => {
        const link = el.querySelector("a");
        return {
          name:
            el.querySelector("[itemprop='name']")?.textContent?.trim() || "",
          link: link ? link.getAttribute("href") : null,
        };
      });

      // Heading and description
      const heading = document.querySelector("h1")?.textContent?.trim() || "";
      const subheading =
        document
          .querySelector(".banner-content p:not(#breadcrumbs)")
          ?.textContent?.trim() || "";

      // Map
      const mapLink =
        document.querySelector(".expand-map")?.getAttribute("href") || "";
      const mapImage =
        document.querySelector(".image-map")?.getAttribute("src") || "";

      // Sections
      const sections = Array.from(
        document.querySelectorAll(".content-section")
      ).map((section) => ({
        title: section.querySelector("h2,h3")?.textContent?.trim() || "",
        text: section.querySelector("p")?.textContent?.trim() || "",
        image: section.querySelector("img")?.getAttribute("src") || "",
        graph:
          section
            .querySelector("canvas, svg, img.graph")
            ?.getAttribute("src") || "",
      }));

      // ✅ Tabs (House report / Unit report / Expert report)
      const tabs = Array.from(document.querySelectorAll("#pills-tab li a"))
        .slice(0, 2)
        .map((tab) => {
          const title = tab.textContent?.trim() || "";
          const targetId = tab.getAttribute("data-bs-target");
          const contentEl = targetId ? document.querySelector(targetId) : null;
          return {
            title,
            content: contentEl ? contentEl.innerHTML.trim() : "",
          };
        });

      // ✅ Extracting Key Market Data Table
      const keyMarketData = Array.from(
        document.querySelectorAll(".key-market-data table tbody tr")
      ).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          label: cells[0]?.textContent?.trim() || "",
          house: cells[1]?.textContent?.trim() || "",
          unit: cells[2]?.textContent?.trim() || "",
        };
      });

      // ✅ Extracting Key Demographics Table
      const keyDemographics = Array.from(
        document.querySelectorAll(".key-demographics table tbody tr")
      ).map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          label: cells[0]?.textContent?.trim() || "",
          value2011: cells[1]?.textContent?.trim() || "",
          value2016: cells[2]?.textContent?.trim() || "",
        };
      });

      // ✅ Scraping data for Median Value Graph
      const medianValueGraphs = {
        oneYear:
          document
            .querySelector(".metric-chart.chart-1-years canvas")
            ?.getAttribute("data-chart-data") || "",
        fiveYears:
          document
            .querySelector(".metric-chart.chart-5-years canvas")
            ?.getAttribute("data-chart-data") || "",
        tenYears:
          document
            .querySelector(".metric-chart.chart-10-years canvas")
            ?.getAttribute("data-chart-data") || "",
      };

      // ✅ Scraping data for Median Growth Graph
      const medianGrowthGraphs = {
        oneYear:
          document
            .querySelector(".metric-chart.chart-1-years canvas")
            ?.getAttribute("data-chart-data") || "",
        fiveYears:
          document
            .querySelector(".metric-chart.chart-5-years canvas")
            ?.getAttribute("data-chart-data") || "",
        tenYears:
          document
            .querySelector(".metric-chart.chart-10-years canvas")
            ?.getAttribute("data-chart-data") || "",
      };

      // ✅ Scraping data for Number of Sales Graph
      const numberOfSalesGraphs = {
        oneYear:
          document
            .querySelector(".metric-chart.chart-1-years canvas")
            ?.getAttribute("data-chart-data") || "",
        fiveYears:
          document
            .querySelector(".metric-chart.chart-5-years canvas")
            ?.getAttribute("data-chart-data") || "",
        tenYears:
          document
            .querySelector(".metric-chart.chart-10-years canvas")
            ?.getAttribute("data-chart-data") || "",
      };

      return {
        breadcrumbs,
        heading,
        subheading,
        map: { link: mapLink, image: mapImage },
        sections,
        tabs,
        keyMarketData, // New keyMarketData
        keyDemographics, // New keyDemographics
      };
    });

    await browser.close();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
}
