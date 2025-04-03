source "https://rubygems.org"

gem "rails", "~> 8.0.2"
gem "pg", "~> 1.1"
gem "propshaft"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "cssbundling-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ windows jruby ]

gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "puma", ">= 5.0"
gem "thruster", require: false
gem "bootsnap", require: false

gem "active_interaction"

# Open Graph processing
gem "ogp"
gem "httpparty"
gem "ostruct"

group :development, :test do
  gem "debug"
  gem "brakeman", require: false
  gem "rubocop-rspec", require: false
  gem "rubocop-rails-omakase", require: false
  gem "rspec-rails", require: false
  gem "factory_bot_rails"
  gem "rubocop", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
