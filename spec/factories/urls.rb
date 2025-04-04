FactoryBot.define do
  factory :url do
    url { "https://opengraphexamples.com/examples/hunted.space-product-pages/" }
    status { "success" }
    title { "Open Graph Examples" }
    description { "Advice, helpful content, and tools to make your Open Graph social cards stand out." }
    object_type { "website" }
    image_url { "https://opengraphexamples.com/og.jpg" }
    canonical_url { "https://opengraphexamples.com" }
    metadata do
      {
        "type" => "website",
        "url" => "https://opengraphexamples.com",
        "title" => "Open Graph Examples",
        "description" => "Advice, helpful content, and tools to make your Open Graph social cards stand out.",
        "image" => "https://opengraphexamples.com/og.jpg"
      }
    end
    error_reason { nil }
  end
end
