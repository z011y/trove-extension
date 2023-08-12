function getProductData() {
  function getOGImage() {
    const result = document.querySelector('meta[property="og:image"]')?.content;
    if (result?.startsWith('http')) {
      return result;
    }

    return null;
  }

  function queryTopImages() {
    const images = [...document.getElementsByTagName('img')];
    images.sort((a, b) => b.width * b.height - a.width * a.height);
    const topImages = images.slice(0, 5);
    const topImageUrls = topImages.map((image) => {
      if (image.src?.startsWith('http')) return image.src;
      if (image.src?.startsWith('/'))
        return `${window.location.hostname}${image.src}`;
    });

    // Prefer OG image as default
    const ogImage = getOGImage();
    if (ogImage && !topImageUrls.includes(ogImage)) {
      topImageUrls.unshift(ogImage);
      if (topImageUrls > 10) topImageUrls.pop();
    }

    return topImageUrls;
  }

  function queryPrice() {
    const matches = document.body.textContent.match(/\$([0-9]+)\.([0-9]+)/g);
    return matches[0].replace(/\$/g, '');
  }

  const url = window.location.href;
  const brand = window.location.hostname.replace(/^www\./, '');
  const name =
    document.querySelector('meta[property="og:title"]')?.content ||
    document.querySelector('title')?.innerText;
  const imageUrls = queryTopImages();
  const price =
    document.querySelector('meta[property="og:price:amount"]')?.content ||
    queryPrice();
  const description =
    document.querySelector('meta[property="og:description"]')?.content ||
    document.querySelector('meta[name="description"]')?.content;
  const isAvailable = !document.body.textContent.includes('out of stock');

  return {
    url,
    brand,
    name,
    imageUrls,
    price,
    description,
    isAvailable,
  };
}

(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const productData = getProductData();
    if (request.getItem) sendResponse(productData);
    return true;
  });
})();
