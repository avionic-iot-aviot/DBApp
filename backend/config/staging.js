// config.js
module.exports = {
  env: {
    envFilename: `.env.staging`
  },
  arp: {
    interface: "edge0",
    entry_interface: "iface"
  },
  watcher_apr: {
    path_to_watch: "/proc/net/arp"
  },
  watcher_leases: {
    path_to_watch: "/var/lib/misc/dnsmasq.leases"
  },
  general: {
    ipIpDb: process.env.IPDB,
    path_to_log: "/root/log.txt",
    path_to_log_ok: "/root/log_ok.txt",
    path_to_log_err: "/root/log_err.txt", 
    //ipFrontend: process.env.IPFRONTEND,
    ipDnsServerApp: process.env.IPDNSSERVERAPP,
    portDnsServerApp: "3900",
  }
};
