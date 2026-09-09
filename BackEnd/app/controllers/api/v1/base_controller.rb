module Api
  module V1
    class BaseController < ApplicationController
      def health
        render json: { status: "ok", api_version: "v1" }
      end
    end
  end
end
