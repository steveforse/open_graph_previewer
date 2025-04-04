# The purpose of this class is to store a representation of the open graph data
# for a given url.
class Url < ApplicationRecord
  enum :status, {
    success: "success",
    error: "error"
  }

  def fetch
    refresh! unless success?
    self
  end

  def refresh!
    return unless url # TODO: raise?
    open_graph = OGP::OpenGraph.new(HTTParty.get(url))
    update!(
      canonical_url: open_graph.url,
      description: open_graph.description,
      error_reason: nil,
      image_url: open_graph.image.url,
      metadata: open_graph.data,
      object_type: open_graph.type,
      status: :success,
      title: open_graph.title
    )
  rescue => e
    fail!(e.message)
  end

  def fail!(error_reason)
    update!(
      canonical_url: nil,
      description: nil,
      error_reason: "#{error_reason}",
      image_url: nil,
      metadata: nil,
      object_type: nil,
      status: :error,
      title: nil
    )
  end
end
