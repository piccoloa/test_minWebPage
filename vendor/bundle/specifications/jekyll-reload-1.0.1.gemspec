# -*- encoding: utf-8 -*-
# stub: jekyll-reload 1.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-reload".freeze
  s.version = "1.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jordon Bedwell".freeze]
  s.date = "2017-12-11"
  s.email = ["jordon@envygeeks.io".freeze]
  s.homepage = "http://github.com/anomaly/jekyll-reload/".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "2.7.7".freeze
  s.summary = "Reload your content when Jekyll finishes building.".freeze

  s.installed_by_version = "2.7.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<em-websocket>.freeze, ["~> 0.5"])
      s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 3.5"])
    else
      s.add_dependency(%q<em-websocket>.freeze, ["~> 0.5"])
      s.add_dependency(%q<jekyll>.freeze, ["~> 3.5"])
    end
  else
    s.add_dependency(%q<em-websocket>.freeze, ["~> 0.5"])
    s.add_dependency(%q<jekyll>.freeze, ["~> 3.5"])
  end
end
