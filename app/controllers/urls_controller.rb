class UrlsController < ApplicationController
  protect_from_forgery with: :exception

  def index
    @urls = Url.all.order(created_at: :desc)

    respond_to do |format|
      format.json { render json: @urls }
      format.html { render :index }
    end
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
