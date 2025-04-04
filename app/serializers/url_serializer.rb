class UrlSerializer < ActiveModel::Serializer
  attributes(
    :canonical_url,
    :description,
    :error_reason,
    :image_url,
    :object_type,
    :status,
    :title,
    :url
  )

  def image_url
    object.image_url.presence
  end

  def title
    object.title.presence || "No title available"
  end

  def description
    object.description.presence || "No description available"
  end
end
