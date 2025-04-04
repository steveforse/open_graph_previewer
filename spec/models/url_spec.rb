# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Url, type: :model do
  let(:url) { build(:url, status: status) }
  let(:status) { "success" }


  it "defines enum for status" do
    expect(url)
      .to define_enum_for(:status)
      .with_values(success: "success", error: "error")
      .backed_by_column_of_type(:string)
  end

  describe '#fetch' do
    subject(:fetch) { url.fetch }

    before do
      allow(url)
        .to receive(:refresh!)
        .and_call_original
    end

    context 'when status is not success' do
      let(:status) { "error" }

      it 'calls refresh!' do
        fetch

        expect(url).to have_received(:refresh!)
      end
    end

    context 'when status is success' do
      let(:status) { "success" }

      it 'does not call refresh!' do
        fetch

        expect(url).not_to have_received(:refresh!)
      end
    end

    it { is_expected.to be_a described_class }
  end

  describe '#refresh!' do
    subject(:refresh) { url.refresh! }

    let(:entered_url) { 'https://example.com/url-ABC123/' }
    let(:status) { "error" }
    let(:url) { build(:url, url: entered_url, status: 'error') }
    let(:mock_response) { double('HTTParty Response') }
    let(:mock_open_graph) do
      instance_double(
        OGP::OpenGraph,
        url: canonical_url,
        description: description,
        image: double(url: image_url),
        data: metadata,
        type: object_type,
        title: title
      )
    end
    let(:canonical_url) { "https://example.com/canonical-url/" }
    let(:description) { "This is a very real description" }
    let(:image_url) { "https://example.com/image.jpg" }
    let(:object_type) { "website" }
    let(:title) { "Amazing Open Graph Website" }
    let(:metadata) do
      {
        "url" => canonical_url,
        "description" => description,
        "type" => object_type,
        "title" => title
      }
    end

    before do
      allow(HTTParty)
        .to receive(:get)
        .with(entered_url)
        .and_return(mock_response)

      allow(OGP::OpenGraph)
        .to receive(:new)
        .with(mock_response)
        .and_return(mock_open_graph)
    end


    context 'when successful' do
      it 'updates the url with open graph data' do
        refresh

        expect(url)
          .to have_attributes(
            canonical_url: canonical_url,
            description: description,
            error_reason: nil,
            image_url: image_url,
            metadata: metadata,
            object_type: object_type,
            status: "success",
            title: title,
            url: entered_url
          )
      end
    end

    context 'when url is nil' do
      let(:url) { build(:url, url: nil) }

      it 'does not attempt to fetch open graph data' do
        refresh

        expect(HTTParty).not_to have_received(:get)
      end
    end

    context 'when an error occurs' do
      let(:error_reason) { "Connection error" }

      before do
        allow(HTTParty)
          .to receive(:get)
          .with(entered_url)
          .and_raise(StandardError.new(error_reason))

        allow(url)
          .to receive(:fail!)
          .and_call_original
      end

      it 'calls fail! with the error message' do
        refresh

        expect(url)
          .to have_received(:fail!)
          .with(error_reason)
      end
    end
  end

  describe '#fail!' do
    let(:url) { create(:url, status: 'success') }
    let(:error_reason) { "Something went wrong!" }

    it 'updates the url with error status and clears data' do
      url.fail!(error_reason)

      expect(url)
        .to have_attributes(
          canonical_url: nil,
          description: nil,
          error_reason: error_reason,
          image_url: nil,
          object_type: nil,
          metadata: nil,
          status: "error",
          title: nil
        )
    end
  end
end
