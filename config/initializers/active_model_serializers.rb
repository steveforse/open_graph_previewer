ActiveModelSerializers.config.adapter = :attributes

# Customize the key transform to use camelCase for JSON responses
ActiveModelSerializers.config.key_transform = :camel_lower

# Set the JSON API content type for all responses
# Rails.application.config.action_controller.renderers.add(
#   :json,
#   lambda do |obj, options|
#     options = options.merge(content_type: 'application/vnd.api+json')
#     obj.respond_to?(:to_json) ? obj.to_json(options) : obj
#   end
# )
