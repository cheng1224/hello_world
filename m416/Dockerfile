FROM nexus-public.91convert.cn/convertlab/java

ARG jar

COPY start.sh /opt/start.sh

ADD build/libs/$jar /opt/$jar

RUN chmod +x /opt/start.sh
