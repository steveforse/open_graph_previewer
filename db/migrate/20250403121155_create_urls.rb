class CreateUrls < ActiveRecord::Migration[8.0]
  def change
    create_table :urls, id: :uuid, default: "gen_random_uuid()" do |t|
      t.string :url
      t.string :status
      t.string :title
      t.string :description
      t.string :object_type
      t.string :image_url
      t.string :canonical_url
      t.jsonb :metadata
      t.string :error_reason

      t.timestamps
    end
  end
end
