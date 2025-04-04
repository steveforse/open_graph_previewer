class UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:fetch_open_graph]

  def index
    @urls = Url.all
  end

  def fetch_open_graph
    url_param = params[:url]

    @url = Url
      .find_or_initialize_by(url: url_param)
      .fetch
    render json: @url
  rescue => e
    # Record the error
    @url = Url.find_or_initialize_by(url: url_param)
    @url.fail!(e.message)

    render json: { error_reason: e.message }, status: :unprocessable_entity
  end
end
